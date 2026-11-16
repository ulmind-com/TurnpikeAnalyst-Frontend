import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  getChatbotSettings,
  sendChatMessage,
} from "@turnpike/shared/api/services/chatbot.api";
import type { ChatTurn } from "@turnpike/shared/types/chatbot";

/**
 * Support widget.
 *
 * The transcript lives in component state and in sessionStorage, not on the
 * server: a visitor asking two questions should not need an account, and
 * the backend keeps its own copy for the admin anyway. Only the last few
 * turns are sent back, which is enough for "and what about X?" to work.
 */
export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const settings = useQuery({
    queryKey: ["chatbot", "settings"],
    queryFn: getChatbotSettings,
    // The widget is on every page; the greeting changes rarely.
    staleTime: 5 * 60_000,
    retry: false,
  });

  const send = useMutation({
    mutationFn: (message: string) =>
      sendChatMessage({
        message,
        history: turns.slice(-6),
        conversation_id: conversationId,
      }),
    onSuccess: (data) => {
      setConversationId(data.conversation_id);
      setTurns((current) => [...current, { role: "assistant", content: data.reply }]);
      setSuggestions(data.suggestions ?? []);
    },
    onError: () => {
      setSuggestions([]);
      setTurns((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Something went wrong reaching the assistant. Try again in a moment, or email hello@turnpikeanalyst.com.",
        },
      ]);
    },
  });

  // Restore the transcript across a page navigation within the same tab.
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem("turnpike.chat");
      if (saved) {
        const parsed = JSON.parse(saved) as { turns: ChatTurn[]; id: string | null };
        setTurns(parsed.turns ?? []);
        setConversationId(parsed.id ?? null);
      }
    } catch {
      // Blocked site data; the widget still works, it just starts fresh.
    }
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        "turnpike.chat",
        JSON.stringify({ turns, id: conversationId }),
      );
    } catch {
      // Not worth surfacing.
    }
  }, [turns, conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, send.isPending]);

  if (settings.data && !settings.data.enabled) return null;

  const ask = (message: string) => {
    const text = message.trim();
    if (!text || send.isPending) return;
    setTurns((current) => [...current, { role: "user", content: text }]);
    setInput("");
    setSuggestions([]);
    send.mutate(text);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close the assistant" : "Open the assistant"}
        aria-expanded={open}
        className="fixed bottom-24 right-5 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-float transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Support assistant"
          className="fixed bottom-44 right-5 z-50 flex max-h-[min(32rem,calc(100vh-13rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
        >
          <header className="border-b border-border px-5 py-4">
            <p className="font-display text-sm font-semibold text-foreground">
              Turnpike assistant
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Researches the Turnpike Analyst site to answer your questions.
            </p>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {turns.length === 0 ? (
              <p className="rounded-2xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                {settings.data?.greeting ??
                  "Ask me anything about the internship programme or our services."}
              </p>
            ) : null}

            {turns.map((turn, index) => (
              <div
                key={index}
                className={
                  turn.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                    : "mr-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-muted/60 px-4 py-2.5 text-sm text-foreground"
                }
              >
                {turn.content}
              </div>
            ))}

            {send.isPending ? (
              <div className="mr-auto flex items-center gap-2 rounded-2xl bg-muted/60 px-4 py-2.5">
                <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Thinking…</span>
              </div>
            ) : null}
          </div>

          {suggestions.length && !send.isPending ? (
            <div className="flex flex-wrap gap-1.5 border-t border-border/60 px-3 pb-1 pt-2.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-left text-xs font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question…"
              maxLength={2000}
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() || send.isPending}
              aria-label="Send"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

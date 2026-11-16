import { Link } from "@tanstack/react-router";
import { NavigationMenuContent } from "@turnpike/shared/components/ui/navigation-menu";

export function SimpleDarkDropdown({ data }: { data: any }) {
  // Flatten all items from the structured data categories
  const allItems = data.categories.flatMap((cat: any) => cat.items);
  
  // Sort them alphabetically just like the live website
  const sortedItems = [...allItems].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <NavigationMenuContent>
      {/* Dark theme wrapper mirroring the turnpikeanalyst.com aesthetic */}
      <div className="w-[850px] bg-[#1a1c23] p-10 shadow-2xl border-t-2 border-primary rounded-b-lg">
        <ul className="grid grid-cols-3 gap-y-6 gap-x-8">
          {sortedItems.map((item: any, idx: number) => (
            <li key={idx}>
              <Link
                to={item.href}
                className="text-[15px] font-medium text-slate-300 hover:text-white transition-colors block py-1"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </NavigationMenuContent>
  );
}

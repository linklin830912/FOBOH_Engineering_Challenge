import { Bell, Search } from "lucide-react";

function getFormattedDate() {
  const date = new Date();

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function Header() {
  return (
    <header className="flex h-[84px] w-full items-center justify-between bg-[#147D73] px-4 py-[19px]">
      {/* Left */}
      <div>
        <h1 className="text-[24px] font-semibold text-white">
          Hello Elemiki
        </h1>

        <p className="text-sm text-[#D9F3EE]">
          {getFormattedDate()}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
          <Search size={18} className="text-white" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-white placeholder:text-[#D9F3EE] outline-none"
          />
        </div>

        {/* Notification */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
          <Bell size={18} className="text-white" />
        </button>

        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#147D73]">
          EE
        </div>
      </div>
    </header>
  );
}
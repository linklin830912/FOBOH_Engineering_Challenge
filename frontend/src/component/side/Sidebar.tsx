import {
  ChartPie,
  ShoppingBag,
  Users,
  Package,
  Tag,
  Truck,
  Cpu,
  Settings,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: ChartPie },
  { label: "Orders", icon: ShoppingBag },
  { label: "Customers", icon: Users },
  { label: "Products", icon: Package },
  { label: "Pricing", icon: Tag, active: true },
  { label: "Freight", icon: Truck, badge: "NEW" },
  { label: "Integrations", icon: Cpu },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[260px] flex-col border-r border-[#F0F0F0] bg-white">
      {/* Top Section */}
      <div>

        {/* Menu */}
        <div className="flex flex-col py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`flex h-[44px] items-center gap-3 pl-8 transition-all ${
                  item.active
                    ? "border-r-[1.5px] border-[#147D73] bg-[#F8FAFA]"
                    : "hover:bg-gray-50"
                }`}
              >
                <Icon
                  size={20}
                  className={
                    item.active ? "text-[#147D73]" : "text-[#637381]"
                  }
                />

                <span
                  className={`text-[16px] font-medium tracking-[-0.18px] ${
                    item.active ? "text-[#212B36]" : "text-[#637381]"
                  }`}
                >
                  {item.label}
                </span>

                {item.badge && (
                  <span className="ml-auto pr-6 text-[12px] font-semibold text-[#DC3545]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Divider */}
          <div className="px-4 py-4">
            <div className="border-t border-[#F0F0F0]" />
          </div>

          {/* Settings */}
          <button className="flex h-[44px] items-center gap-3 pl-8 hover:bg-gray-50">
            <Settings size={20} className="text-[#637381]" />
            <span className="text-[16px] font-medium text-[#637381]">
              Settings
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Logo */}
      <div className="mt-auto flex h-[80px] items-center px-8">
        <h1 className="text-[28px] font-bold tracking-tight text-[#2F4447]">
          FOBOH
        </h1>
      </div>
    </aside>
  );
}
import MainContent from "../component/main/pricing/MainContent";
import Sidebar from "../component/side/Sidebar";
import Header from "../component/top/Header";

export default function MainPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[260px] flex min-h-screen flex-1 flex-col">
        <Header />
        <MainContent />
      </div>
    </div>
  );
}
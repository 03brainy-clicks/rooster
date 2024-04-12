import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Settings = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const categoryList = [
    { title: "Account Details", value: "account-details" },
    { title: "Reset Password", value: "reset-password" },
  ];

  const handleCategory = (value: string) => {
    navigate(`/settings/${value}`);
  };

  return (
    <div className="w-7/12 mx-auto min-h-screen">
      <div className="py-7 flex-1">
        <h1 className="text-5xl font-semibold ">Settings</h1>
      </div>

      <ul className="w-full flex gap-3 text-sm border-b sticky top-0 bg-white pt-5 mb-5 z-1">
        {categoryList.map((item) => (
          <li
            key={item.value}
            onClick={() => handleCategory(item.value)}
            className={`category ${
              path.includes(item.value)
                ? "border-black text-black"
                : "border-transparent text-rooster-textSimple"
            }`}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;

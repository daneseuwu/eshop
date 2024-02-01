"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CiSettings, CiUser, CiDeliveryTruck, CiShop } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";

const linkadmin = [
  {
    title: "Products",
    path: "/admin/products",
    icon: <CiShop size={20} />,
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: <CiDeliveryTruck size={20} />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <CiUser size={20} />,
  },
];

const linkuser = [
  {
    title: "Orders",
    path: "/orders",
    icon: <CiDeliveryTruck size={20} />,
  },
  {
    title: "Setting",
    path: "/setting",
    icon: <CiSettings size={20} />,
  },
];

export const Linksadmin = () => {
  const router = useRouter();
  return (
    <>
      {linkadmin.map((item) => (
        <DropdownMenuItem
          key={item.path}
          className="text-muted-foreground flex cursor-pointer items-center gap-2 text-xs"
        >
          {item.icon}
          <button type="button" onClick={() => router.push(`${item.path}`)}>
            {item.title}
          </button>
          {/* <Link href={item.path}>{item.title}</Link> */}
        </DropdownMenuItem>
      ))}
    </>
  );
};

export const Linksuser = () => {
  const router = useRouter();

  return (
    <>
      {linkuser.map((item) => (
        <DropdownMenuItem
          key={item.path}
          className="text-muted-foreground flex cursor-pointer items-center gap-2 text-xs"
        >
          {item.icon}
          <button type="button" onClick={() => router.push(`${item.path}`)}>
            {item.title}
          </button>
          {/* <Link href={item.path}>{item.title}</Link> */}
        </DropdownMenuItem>
      ))}
    </>
  );
};

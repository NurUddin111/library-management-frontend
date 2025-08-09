import { FiSearch } from "react-icons/fi";
import { Input } from "./ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav>
      <div className="flex items-center justify-around py-3 bg-amber-200">
        <div>
          <img
            className="h-24 rounded-2xl"
            src="https://i.ibb.co/8LnKgPcq/9146d460754c7c4d9055ef26d3b9b77d.jpg"
            alt=""
          />
        </div>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/books"
                  className={cn("px-4 py-2 text-lg font-medium")}
                >
                  All Books
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/create-books"
                  className={cn("px-4 py-2 text-lg font-medium")}
                >
                  Add Books
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/borrow-summary"
                  className={cn("px-4 py-2 text-lg font-medium")}
                >
                  Borrow Summary
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div className="relative w-full max-w-sm">
                  <Input
                    type="text"
                    placeholder="Search book by ID"
                    className="pr-10 bg-white rounded-3xl"
                  />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2">
                    <Button variant="ghost" className="size-8 text-black bg-white rounded-3xl">
                      <FiSearch size={18} />
                    </Button>
                  </span>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

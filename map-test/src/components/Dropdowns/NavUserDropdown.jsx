import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Store } from "../../context/Store";
import { useNavigate } from "react-router-dom";

function NavUserDropdown() {
  const { state, dispatch } = useContext(Store);
  const {apt_track_User} = state
  const navigate = useNavigate()

  const logout_user = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <Menu>
      <MenuButton>
        <div className="flex flex-row items-center">
          <span>
            <Avatar size={"sm"} name={apt_track_User?.username} src={apt_track_User?.photoURL} />
          </span>
          <span>
            <ChevronDownIcon height={16} width={16} />
          </span>
        </div>
      </MenuButton>
      <MenuList>
        <MenuItem textColor={"gray.700"}>Notifications</MenuItem>
        <MenuDivider />
        <MenuItem textColor={"gray.700"} onClick={() => navigate('/account')}>Account</MenuItem>
        <MenuItem textColor={"gray.700"}>Password</MenuItem>
        <MenuDivider />
        <MenuItem textColor={"gray.700"} onClick={logout_user}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default NavUserDropdown;

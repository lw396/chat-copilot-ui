// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  ChromeOutlined,
  MinusOutlined,
  BankOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const message = {
  id: "message",
  title: <FormattedMessage id="message" />,
  type: "group",
  icon: ChromeOutlined,
  children: [
    {
      id: "home-page",
      title: <FormattedMessage id="home-page" />,
      type: "item",
      url: "/home-page",
      icon: BankOutlined,
      target: false,
    },
    {
      id: "group-chat",
      title: <FormattedMessage id="group-chat" />,
      type: "item",
      url: "/group-chat",
      icon: UsergroupDeleteOutlined,
      target: false,
    },
    {
      id: "tables",
      title: <FormattedMessage id="tables" />,
      type: "item",
      url: "/tables",
      icon: UserOutlined,
      target: false,
    },
    {
      id: "paginationTable",
      title: <FormattedMessage id="paginationTable" />,
      type: "item",
      url: "/paginationTable",
      icon: MinusOutlined,
      target: false,
    },
  ],
};

export default message;

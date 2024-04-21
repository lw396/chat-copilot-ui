// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from "react-intl";

// assets
import { ChromeOutlined, MinusOutlined } from "@ant-design/icons";

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const samplePage = {
  id: "sample-page",
  title: <FormattedMessage id="sample-page" />,
  type: "group",
  icon: ChromeOutlined,
  children: [
    {
      id: "maintenance",
      title: <FormattedMessage id="maintenance" />,
      type: "item",
      isDropdown: false,
      url: "/sample-page",
      icon: MinusOutlined,
      target: false,
    },
    {
      id: "tables",
      title: <FormattedMessage id="tables" />,
      type: "item",
      url: "/tables",
      icon: MinusOutlined,
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

export default samplePage;

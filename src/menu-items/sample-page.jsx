// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { ChromeOutlined, PlusOutlined, MinusOutlined} from '@ant-design/icons';

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const samplePage = {
  id: 'sample-page',
  title: <FormattedMessage id="sample-page" />,
  type: 'group',
  icon: ChromeOutlined,
  children: [
    {
      id: 'list',
      title: <FormattedMessage id="maintenance" />,
      type: 'collapse',
      icon: MinusOutlined,
      isDropdown: false,
      children: [
        {
          id: 'tables',
          title: <FormattedMessage id="tables" />,
          type: 'item',
          url: '/tables',
          icon: PlusOutlined,
          target: false
        },
        {
          id: 'paginationTable',
          title: <FormattedMessage id="paginationTable" />,
          type: 'item',
          url: '/paginationTable',
          icon: PlusOutlined,
          target: false
        }
      ]}
  ]
  
};

export default samplePage;

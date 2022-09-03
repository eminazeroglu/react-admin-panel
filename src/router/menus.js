import {FiHome} from "@react-icons/all-files/fi/FiHome";
import {FiUsers} from "@react-icons/all-files/fi/FiUsers";
import {MdGTranslate} from "@react-icons/all-files/md/MdGTranslate";
import {IoLanguage} from "@react-icons/all-files/io5/IoLanguage";
import {FiKey} from "@react-icons/all-files/fi/FiKey";
import {BsReverseLayoutTextWindowReverse} from "@react-icons/all-files/bs/BsReverseLayoutTextWindowReverse";
import {FiCode} from "@react-icons/all-files/fi/FiCode";

const translateKey = 'crm.Sidebar.';
export default [
    {
        title: translateKey + 'HomePage',
        icon: <FiHome/>,
        route: 'app.index',
        permission: 'accept'
    },
    {
        title: translateKey + 'Menus',
        icon: <BsReverseLayoutTextWindowReverse/>,
        route: 'app.menu',
        permission: 'accept'
    },
    {
        title: translateKey + 'Users',
        icon: <FiUsers/>,
        route: 'app.user',
        permission: 'accept'
    },
    {
        title: translateKey + 'Languages',
        icon: <IoLanguage/>,
        route: 'app.language',
        permission: 'accept'
    },
    {
        title: translateKey + 'Translates',
        icon: <MdGTranslate/>,
        route: 'app.translate',
        permission: 'accept'
    },
    {
        title: translateKey + 'Permissions',
        icon: <FiKey/>,
        route: 'app.permission',
        permission: 'accept',
    },
    {
        title: translateKey + 'SeoMetaTag',
        icon: <FiCode/>,
        route: 'app.seo',
        permission: 'accept',
    },
    {
        title: translateKey + 'Setting',
        icon: <FiHome/>,
        route: 'app.setting',
        permission: 'accept',
    }
]

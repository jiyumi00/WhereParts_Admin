import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';

export default class Constant{
    static serviceURL="http://203.241.251.177/wparts/";
    static getSideMenus(){
        return  [
            { name: "대시보드", href: "/DashBoard", icon: <HomeIcon /> },
            { name: "회원관리", href: "/UserInfo", icon: <PersonIcon /> },
            { name: "판매내역", href: "/Sale", icon: <MonetizationOnIcon /> },
            { name: "거래내역", href: "/Transaction", icon: <ReceiptIcon /> }
        ];
    }
}


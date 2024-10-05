import { userCheck, showUserView, adminCheck} from "./func_scripts/user_login_checker.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    adminCheck(true);
    showUserView();  
});

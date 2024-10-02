import { userCheck, showUserView, adminCheck} from "./user_login_checker.js";
document.addEventListener('DOMContentLoaded', function () {
    userCheck();
    adminCheck();
    showUserView();  
});

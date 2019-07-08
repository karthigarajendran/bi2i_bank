function login(login_detail) {
        if ( ((login_detail.username=="31000") && (login_detail.password=="Bi2i@1234")) || 
        ((login_detail.username=="31001") && (login_detail.password=="Bi2i@1234")) ||
        ((login_detail.username=="31002") && (login_detail.password=="Bi2i@1234")) ||
        ((login_detail.username=="31003") && (login_detail.password=="Bi2i@1234")) ) {
            
                window.location = './index.html';
                localStorage.setItem("customer_id",login_detail.username)
               
                document.getElementById("error").style.visibility = "hidden"
        }    
        else if((login_detail.username=="") || (login_detail.password==" ")){
                document.getElementById("error").innerHTML = "*Username and Password is required"
                document.getElementById("error").style.visibility = "visible"
        }
        else{
                document.getElementById("error").innerHTML = "*Invalid credentials"
                document.getElementById("error").style.visibility = "visible"

        }
}

let h3= document.getElementsByTagName("h3")
let form1= document.getElementsByClassName("form1")[0];
let form2= document.getElementsByClassName("form2")[0];
let input= document.getElementsByTagName("input");
let hide= document.getElementsByClassName("hid");
let submit= document.getElementsByClassName("submit");
// console.log(hide.length);
for(let i=0; i<input.length; i++){
    input[i].onkeydown=()=>{
        let val;
        switch(i) {
            case 0:
              val=input[0].value
              let nameReg = /^[a-zA-Z\s]{3,30}$/;
              if (nameReg.test(val)) {
                // console.log("CORRECT NAME");
                input[0].style.border = "1px solid green";
                hide[0].setAttribute("hidden", "true")
                input[0].classList.remove("shake");
                submit[0].removeAttribute("disabled");
            }
            else {
                // console.log("INCORRECT  NAME");
                input[0].style.border = "1px solid red";
                input[0].className = "shake";
                hide[0].removeAttribute("hidden");
                submit[0].setAttribute("disabled","true");
            }
              break;
            case 1:
                val=input[1].value
                let emailReg = /^[a-z0-9]*\.?\-?\_?[a-z0-9]{1,15}\@[a-z^0-9]*\.[a-z]{2,3}$/i;
                if (emailReg.test(val)) {
                    // console.log("CORRECT Email");
                    input[1].style.border = "1px solid green";
                    hide[1].setAttribute("hidden", "true")
                    input[1].classList.remove("shake");
                    submit[0].removeAttribute("disabled");
                }
                else {
                    // console.log("INCORRECT  Email");
                    input[1].style.border = "1px solid red";
                    input[1].className = "shake";
                    hide[1].removeAttribute("hidden");
                    submit[0].setAttribute("disabled","true");
                }
              break;
            case 5:
                val=input[5].value
                let emailRe = /^[a-z0-9]*\.?\-?\_?[a-z0-9]{1,15}\@[a-z^0-9]*\.[a-z]{2,3}$/i;
                if (emailRe.test(val)) {
                    // console.log("CORRECT Email");
                    input[5].style.border = "1px solid green";
                    hide[2].setAttribute("hidden", "true")
                    input[5].classList.remove("shake");
                    submit[1].removeAttribute("disabled");
                }
                else {
                    // console.log("INCORRECT  Email");
                    input[5].style.border = "1px solid red";
                    input[5].className = "shake";
                    hide[2].removeAttribute("hidden");
                    submit[1].setAttribute("disabled","true");
                }
                break;
          }
    }

}

let show=()=>{
    form1.style.display="flex";
    form2.style.display="none";
    h3[0].style.borderBottom="3px solid blue";
    h3[1].style.borderBottom="none";
}
let show1=()=>{
    form2.style.display="flex";
    form2.style.justifyContent="center"
    form1.style.display="none";
    h3[1].style.borderBottom="3px solid blue";
    h3[0].style.borderBottom="none";
}
h3[0].addEventListener("click", show )
h3[1].addEventListener("click", show1 )
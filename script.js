
// شروع سایت حباب بیوتی

document.addEventListener("DOMContentLoaded", function(){

    console.log("HABAB BEAUTY loaded ✨");


    // افکت ظاهر شدن کارت‌ها

    const cards = document.querySelectorAll(".card");


    cards.forEach((card,index)=>{

        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";


        setTimeout(()=>{

            card.style.transition = "0.7s";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";


        }, index * 150);


    });


});

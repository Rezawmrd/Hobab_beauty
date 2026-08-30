// HOBAB BEAUTY

document.addEventListener("DOMContentLoaded", function(){


    console.log("HABAB BEAUTY loaded");


    // Services Accordion

    const servicesToggle =
        document.querySelector(".services-toggle");

    const servicesContent =
        document.querySelector(".services-content");


    if(servicesToggle && servicesContent){

        servicesToggle.addEventListener("click", function(){

            const isOpen =
                servicesContent.classList.contains("open");


            if(isOpen){

                servicesContent.classList.remove("open");

                servicesToggle.classList.remove("active");

                servicesToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }else{

                servicesContent.classList.add("open");

                servicesToggle.classList.add("active");

                servicesToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    }


});

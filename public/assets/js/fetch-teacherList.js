function loadTeacherList() {
    
    //DOM element
    const gallery = document.querySelector("#teacherGallery")

    // <div1 class="col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex align-items-stretch">
    //         <div2 class="member" data-aos="fade-up" data-aos-delay="100">
    //           <div3 class="member-img">
    //             <img src="https://www.sexymandarin.com/v2/wp-content/uploads/2012/07/melody3-214x300.jpg" class="img-fluid" alt="">
 
    //           </div3>
    //           <div info class="member-info">
    //             <h4>Melody</h4>
    //             <span>Taipei</span>
    //           </div info>
    //         </div2>
    //       </div1>
    // make div1, div2, div3, img, div info, h4, span  -> div3.appendChild(img) -> div2.appendChild(div3) -> div2.appendChild(div info)


   //Fetch videos from API
fetch('http://localhost:3030/api/teachers', {
        method: 'get',
          dataType: 'json',
    })
    .then(response => response.json())
    .then((response)=>{
        console.log(response);
        let teachers = response.teacherList;
            teachers.forEach(teacher => {


                //image thumbnail generator

                let div1 = document.createElement('div');
                div1.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-xs-12", "d-flex", "align-items-stretch");
               
                let div2 = document.createElement('div');
                div2.className = "member";

                let div3 = document.createElement('a');
                div3.className = "member-img";
            

                let image = document.createElement('img');
                image.classList.add("img-fluid");
                image.setAttribute("src", `${teacher.thumbnail}`)

                let infoDiv = document.createElement('div');
                infoDiv.className = "member-info";

                let name = document.createElement('h4');
                let nameTex = document.createTextNode(`${teacher.name}`);
                name.appendChild(nameTex);

                let hometownSpn = document.createElement('span');
                let hometowntex = document.createTextNode(`${teacher.hometown}`);
                hometownSpn.appendChild(hometowntex);

                infoDiv.appendChild(name);
                infoDiv.appendChild(hometownSpn);

                div3.appendChild(image);

                div2.appendChild(div3);
                div2.appendChild(infoDiv);

                div1.appendChild(div2);


                gallery.appendChild(div1);

                console.log(div1);

           } //for-loop end
            );
            
            
    
                
            })
.catch((error)=>{
    console.log('Failed to fetch API', error);
})
 
} //end LocadVideos function

// Invoking the loadVideos function
document.addEventListener("DOMContentLoaded", loadTeacherList);
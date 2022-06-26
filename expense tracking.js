//console.log('jani')
function addData(e){
    e.preventDefault();
    let exp=document.getElementById('cost').value;
    let ctg=document.getElementById('categery').value;
    let cars=document.getElementById('cars').value;

    let obj={
        exp:exp,
        ctg:ctg,
        cars:cars
    }
    //console.log(obj);

    axios.post('https://crudcrud.com/api/4a9cf4012c5c4fb7bc4ebca8f7849d26/expenses',obj)
        .then((res)=>{
            //display the data
            axios.get('https://crudcrud.com/api/4a9cf4012c5c4fb7bc4ebca8f7849d26/expenses')
                .then((res)=>{
                    let exp=res.data[res.data.length-1].exp;
                    let ctg=res.data[res.data.length-1].ctg;
                    let crs=res.data[res.data.length-1].cars;
                    let id=res.data[res.data.length-1]._id;

                    console.log(exp, ctg,cars, id);

                    display(id,exp,ctg,cars);
                })
        })
        .catch((err)=>{console.error(err);})
    
}

//displaying the data
function display(id,exp,ctg,cars) {
    let parent=document.getElementById('list-items');

    let ele=
    `<li id=${id} class="list">${exp} -  ${ctg} - ${cars}
        <button onclick=deleteUser('${id}') class="dlt_btn">Delete</button>
        <button onclick=EditUserDetails('${id}') class="edt_btn">Edit</button>
    </li>` 
    parent.innerHTML+=ele;
}

//getint the all data stored in server
axios.get('https://crudcrud.com/api/4a9cf4012c5c4fb7bc4ebca8f7849d26/expenses')
    .then((res)=>{
        res.data.forEach(element => {
            if(element.exp)
            {display(element._id,element.exp,element.ctg,element.cars,);}
        })  
    })
    .catch((err)=>{console.log(err)});


//deleting the data form server
function deleteUser(_id){
    axios.delete(`https://crudcrud.com/api/4a9cf4012c5c4fb7bc4ebca8f7849d26/expenses/${_id}`)
    .then((res)=>{
        console.log('deleted successfully');
        deleteFromPage(_id);
    })
    .catch(err=>console.log(err));
}
//deleting the data form page
function deleteFromPage(_id) {
    let ele=document.getElementById(_id);
    let parentnode=document.getElementById('list-items');
    if(ele){
        parentnode.removeChild(ele);
    }
}
    
//edit  deta
function EditUserDetails(_id){
    //calling the server for data with id
    axios.get(`https://crudcrud.com/api/4a9cf4012c5c4fb7bc4ebca8f7849d26/expenses/${_id}`)
        .then((res) => {
            console.log(res)
            let expenses=res.data.exp;
            let categery=res.data.ctg;
            let car=res.data.cars;
            //consolel
            // displaying the data from server in form fields
            let exp=document.getElementById('cost').value=expenses;
            let ctg=document.getElementById('categery').value=categery;
            let cars=document.getElementById('cars').value=car;
            //deleteUser(_id);
            let edit=document.getElementById('submit');

            edit.addEventListener('click',(e)=>{
                e.preventDefault();
                //getting all data from from
                let exp=document.getElementById('cost').value;
                let ctg=document.getElementById('categery').value;
                let cars=document.getElementById('cars').value;
                //converting data into object
                let myobj={
                    exp:exp,
                    ctg:ctg,
                    cars:cars
                }
                axios.put(`https://crudcrud.com/api/4a9cf4012c5c4fb7bc4ebca8f7849d26/expenses/${_id}`,myobj)
                    .then((res) =>{ console.log('updated the data')
                        deleteFromPage(_id);
                        display(_id,exp,ctg,cars);
                    })
                    .catch(err=>console.log(err));
            })
        })
        .catch((err) => console.log(err));
    //axios ended here

}

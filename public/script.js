var i=1;
const question_input=$("#question_div input,#title_div input");
const option_input=$("#options .option input");
const add=$("#main form>p i");
const options=$("#options");
var url=`http://localhost:8080/`


$(question_input).on("focus",function()
{
    $(this).css("border-bottom","2px solid rgb(128, 13, 194)")
    $(this).parent().find("label").css({transform:"translateY(0px)",color:"rgb(128, 13, 194)"});
})


$(question_input).on("blur",function()
{
    if($(this).val()==="")
    {
    $(this).css("border-bottom","1px solid rgb(179, 179, 179)")
    $(this).parent().find("label").css({transform:"translateY(30px)",color:"rgb(179, 179, 179)"});
    }
})


$(options).on("focus",".option input",function()
{
    $(this).css("border-bottom","2px solid rgb(128, 13, 194)")
    $(this).parent().find("label").css({transform:"translateY(0px)",color:"rgb(128, 13, 194)"});
})


$(options).on("blur",".option input",function()
{
    if($(this).val()==="")
    {
        $(this).css("border-bottom","1px solid rgb(179, 179, 179)")
    $(this).parent().find("label").css({transform:"translateY(30px)",color:"rgb(179, 179, 179)"});
    }
})


$(add).on("click",function()
{
    $(options).append(`<div class="option">
    <label for="option${i}">Option-${i}</label><br>
   <input type="text" id="${i}" name="option${i}"><i class="fas fa-times" required></i>
   </div>`)
   i++;
});

$(options).on("click",".option i",function()
{
    console.log($(this).parent().next());
    if($(this).parent().next().length===0)
    {
    $(this).parent().fadeOut(function()
    {
        $(this).remove();
    })
    i--;
    }
    else
    {
        let k=i;
        for(let j=Number($(this).prev().attr("id"))-1;j<k;j++)
        {
            $("#options div").eq(j).fadeOut(function()
            {
                $(this).remove();
            })
            i--;
        }
        i++;
    }
})

// fetch
$(submit).on("click",function(e)
{
    const title=$("#title").val();
    const question =$("#question_div #question").val();
    const options_arr=[];
    for(let j=0;j<i-1;j++)
    {
        options_arr.push($("#options>div input").eq(j).val())
    }
    console.log(`title:${title}`);
    console.log(question);
    console.log(options_arr);
    e.preventDefault();
  fetch(url,{
      method:"POST",
      body:JSON.stringify({
       title:title,
       question:question,
       option:options_arr,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),

  })
  .then(res=>res.json())
  .then((data)=>{
    window.location.href=`/poll/${title}`
    
  })
  .catch((err) => console.log(err));
  
})
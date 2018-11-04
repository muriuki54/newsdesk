$(document).ready(() => {
    $('.toggleBtn').click(() => {
        $('aside').toggleClass('active');
        $('.toggleBtn').toggleClass('push');
    })
            //DEFAULT REQUESTS
            $.ajax({
                url: 'https://newsapi.org/v2/top-headlines?category=general&pageSize=5&apiKey=b536b1c11c8840d3a2a219319ec7e1cb'
            }).then((res) => {
                console.log(res)
                for(var i = 0;i < res.articles.length;i++){
                    article = res.articles[i];
        
                    $('#main').append(`
                    <div class="article">
                    <h3 class="article-head">${article.title}</h3>
                    <div class="thumb">
                    <img src="${article.urlToImage}">
                    <small>Author: ${article.author}</small>
                    </div>
                    <div class="content">
                    <p>${article.content}</p>
                    </div>
                    <a href="${article.url}" class="Read" target="_blank">Read more</a>
                    </div>
                    `)
                }
            }).catch((err) =>{
                console.log(err)
            })
                        //END DEFAULT
                       

     btnText = $('.btnText');
     for(var i = 0;i < btnText.length;i++){
        btnText[i].addEventListener('click',(e) => {
            $('#main').html(``);
           
            if(!e.target.innerHTML){
                selected = 'world';
            } else {
                selected = e.target.innerHTML;
           }
            $.ajax({
                url: 'https://newsapi.org/v2/top-headlines?country=gb&category='+selected+'&pageSize=5&apiKey=b536b1c11c8840d3a2a219319ec7e1cb'
            }).then((res) => {
                console.log(res)
                for(var i = 0;i < res.articles.length;i++){
                    article = res.articles[i];

                    $('#main').append(`
                    <div class="article">
                    <h2 class="article-head">${article.title}</h2>
                    <div class="thumb">
                    <img src="${article.urlToImage}">
                    </div>
                    <div class="content">
                    <small>Author: ${article.author}</small>
                    <p>${article.content}</p>
                    </div>
                    <a href="${article.url}" class="Read" target="_blank">Read more</a>
                    </div>
                    `)
                }
                $('aside').removeClass('active');
                $('.toggleBtn').removeClass('push');
            }).catch((err) =>{
                console.log(err)
            })
        })

     }

    
    $('#form').on('submit',(e) => {
        e.preventDefault();
        //Remove sidebar from display
        $('aside').removeClass('active')
        $('.toggleBtn').removeClass('push');

        
        //SAVE NEW INTEREST TO LOCAL STORAGE
        let retVal = confirm('Always show me this kind of news');  
        if(retVal == true){
           newinterest = $('#interest').val();
           if(localStorage.getItem('interest') == null){
               interest = newinterest;
               localStorage.setItem('interest',JSON.stringify(interest))
           }else{
               interest = JSON.parse(localStorage.getItem('interest'));
               interest = newinterest;
               localStorage.setItem('interest',JSON.stringify(interest));
           }
        } else {
            newinterest = $('#interest').val();
            if(sessionStorage.getItem('interest') == null){
                interest = newinterest;
                sessionStorage.setItem('interest',JSON.stringify(interest))
            }else{
                interest = JSON.parse(sessionStorage.getItem('interest'));
                interest = newinterest;
                sessionStorage.setItem('interest',JSON.stringify(interest));
            }
            $('#interests').html(``);
           currentInterest();
           return false;
        } 
        $('#interests').html(``);
         displayInterests();
    })

    //SHOW ME MY INTERESTS
        function displayInterests(){
            interest = JSON.parse(localStorage.getItem('interest'));
            if(interest !== null) {
                $.ajax({
                    url: 'https://newsapi.org/v2/everything?q='+interest+'&pageSize=10&apiKey=b536b1c11c8840d3a2a219319ec7e1cb'
                }).then((myInterest) => {
                    
                    single = myInterest.articles
                    for(var i = 0;i < single.length;i++){
                        console.log(single[i]);
                        singleInterest = single[i]
                    
                   $('#interests').append(`
                    <div class="interest">
                    <h2 class="interest-head">${singleInterest.title}</h2>
                    <div class="interest-thumb">
                    <img src="${singleInterest.urlToImage}">
                    </div>
                    <div class="interest-content">
                    <small>Author: ${singleInterest.author}</small>
                    <p>${singleInterest.content}</p>
                    </div>
                    <a href="${singleInterest.url}" class="Read" target="_blank">Read more</a>
                    </div>
                    `)}

                }).catch((err) => {
                    console.log(err)
                })
            } else {
                $.ajax({
                    url: 'https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=b536b1c11c8840d3a2a219319ec7e1cb'
                }).then((general) => {
                    console.log(general)
                    single = general.articles
                    for(var i = 0;i < single.length;i++){
                        singleInterest = single[i]
                    
                   $('#interests').append(`
                    <div class="interest">
                    <h2 class="interest-head">${singleInterest.title}</h2>
                    <div class="interest-thumb">
                    <img src="${singleInterest.urlToImage}">
                    </div>
                    <div class="interest-content">
                    <small>Author: ${singleInterest.author}</small>
                    <p>${singleInterest.content}</p>
                    </div>
                    <a href="${singleInterest.url}" class="Read" target="_blank">Read more</a>
                    </div>
                    `)}

                }).catch((err) => {
                    console.log(err)
                })
            }
        }

        //CURRENT INTEREST
        function currentInterest() {
            currentInterest = JSON.parse(sessionStorage.getItem('interest'))
            $.ajax({
                url: 'https://newsapi.org/v2/everything?q='+currentInterest+'&pageSize=10&apiKey=b536b1c11c8840d3a2a219319ec7e1cb'
            }).then((myInterest) => {
                
                single = myInterest.articles
                for(var i = 0;i < single.length;i++){
                    console.log(single[i]);
                    singleInterest = single[i]
                
               $('#interests').append(`
                <div class="interest">
                <h2 class="interest-head">${singleInterest.title}</h2>
                <div class="interest-thumb">
                <img src="${singleInterest.urlToImage}">
                </div>
                <div class="interest-content">
                <small>Author: ${singleInterest.author}</small>
                <p>${singleInterest.content}</p>
                </div>
                <a href="${singleInterest.url}" class="Read" target="_blank">Read more</a>
                </div>
                `)}

            }).catch((err) => {
                console.log(err)
            })
        }
           
        displayInterests();
})
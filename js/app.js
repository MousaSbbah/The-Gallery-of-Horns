'use strict';


$.ajax('./data/%20page-1.json')
  .then(peopleData => {
    console.log(peopleData);
    peopleData.forEach(val => {
      // console.log(val);
      let newHorn = new Horn(val);
      newHorn.render();
      // console.log(newHorn);
    });
    $('.photo-template').first().remove();
  });

const Horn = function(obj){
  this.imageUrl=obj.image_url;
  this.title=obj.title;
  this.description=obj.description;
  this.keyword=obj.keyword;
  this.horns=obj.horns;

};
let arr =[];


Horn.prototype.render=function(){

  let optionElement = $('select option').first().clone();
  optionElement.text(this.keyword );
  optionElement.attr('value',this.keyword);
  if(! arr.includes(optionElement.text())){
    arr.push(optionElement.text());
    $('select').append(optionElement);
  }


  let hornClone = $('.photo-template').first().clone();
  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src',this.imageUrl);
  hornClone.find('p').text(this.description);
  hornClone.addClass(this.keyword);
  hornClone.addClass('show');
  $('main').append(hornClone);


}

$('select').on('change',function(){
  let selectValue = $(this).val();
  if(selectValue !== 'default'){
    $('.photo-template').removeClass('show');
    $('.'+selectValue).addClass('show');
  }else{
    $('.photo-template').addClass('show');
  }
})

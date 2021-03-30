'use strict';

let allHorn1=[];
let allHorn2=[];
let PageNum;
$.ajax('./data/page-1.json')
  .then(peopleData => {
    console.log(peopleData);
    peopleData.forEach(val => {
      let newHorn = new Horn(val);
      allHorn1.push(newHorn);
      // let newRender=newHorn.render();
      // $('main').append(newRender)

    });

  });
$.ajax('./data/page-2.json')
  .then(peopleData => {
    console.log(peopleData);
    peopleData.forEach(val => {
      let newHorn = new Horn(val);
      allHorn2.push(newHorn);
      // let newRender=newHorn.render2();
      // $('main').append(newRender)
    });
    page1Render();

  });
$('.page1Btn').on('click',page1Render)
$('.page2Btn').on('click', page2Render)

const Horn = function(obj){
  this.imageUrl=obj.image_url;
  this.title=obj.title;
  this.description=obj.description;
  this.keyword=obj.keyword;
  this.horns=obj.horns;

};

$('.filter').on( 'change', function() {
  let selected = $(this).val();
  if( selected !=='default'){
    $( 'section' ).hide();
    $( `.${selected}` ).fadeIn( 800 );
  }else{
    $( 'section' ).fadeIn(300);
  }
} );

$('.sort').on( 'change', function() {
  let selected = $(this).val();
  switch (selected) {
  case 'title':
    titleSort();
    render(PageNum);
    break;
  case 'horns':
    hornSort();
    render(PageNum);

    break;
  case 'default':
    render(PageNum);
    break;
  }
} );


function renderList(allHorn) {
  let arr =[];
  $('.filter').html('<option value="default">Filter by Keyword</option>')
  allHorn.forEach(obj => {
    let optionElement = $('.filter option').first().clone();
    optionElement.text(obj.keyword );
    optionElement.attr('value',obj.keyword);
    if(! arr.includes(optionElement.text())){
      arr.push(optionElement.text());
      $('.filter').append(optionElement);
    }
  });
}

function page1Render() {
  $('main').html('')
  allHorn1.forEach(val => {
    let template = $('#horns_template1').html();
    let dataSet = Mustache.render(template,val);
    $('main').append(dataSet);
  });






  $('section').hide();
  $('.photo-template1').fadeIn(800);
  renderList(allHorn1);
  $('button').css('background-color','grey');
  $('.page1Btn').css('background-color','#c49191');
  PageNum=1;
}

function page2Render() {
  $('main').html('')
  allHorn2.forEach(val => {
    let template = $('#horns_template2').html();
    let dataSet = Mustache.render(template,val);
    $('main').append(dataSet);
  });




  $('section').hide();
  $('.photo-template2').fadeIn(800);
  renderList(allHorn2);
  $('button').css('background-color','grey');
  $('.page2Btn').css('background-color','#c49191');
  PageNum=2;
}

function render(pageNum){
  if (pageNum === 1) {
    page1Render();
  }else{
    page2Render();
  }
}

function hornSort(){
  function compare(a, b) {
    const hornA = a.horns;
    const hornB = b.horns;
    let comparison = 0;
    if (hornA > hornB) {
      comparison = 1;
    } else if (hornA < hornB) {
      comparison = -1;
    }
    return comparison;
  }
  allHorn1.sort(compare);
  allHorn2.sort(compare);
}
function titleSort(){
  function compare(a, b) {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    let comparison = 0;
    if (titleA > titleB) {
      comparison = 1;
    } else if (titleA < titleB) {
      comparison = -1;
    }
    return comparison;
  }
  allHorn1.sort(compare);
  allHorn2.sort(compare);
}

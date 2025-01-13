const unitBumf = `<div>
  <div class="lesson">
    <div class="lesson-title">Title here</div>
    <ul class="lesson-activities">
      <li class="activity">
        <div class="activity-done"></div>
        <div class="activity-title">Activity title goes here <span class="skill-tag">Skill tag</span></div>
        <div class="activity-data"></div>
      </li>
      <li class="activity">
        <div class="activity-done"></div>
        <div class="activity-title">Activity title goes here <span class="skill-tag">Skill tag</span></div>
        <div class="activity-data"></div>
      </li>
    </ul>
  </div>
  <div class="lesson">
    <div class="lesson-title">Title here</div>
    <ul class="lesson-activities">
      <li class="activity">
        <div class="activity-done"></div>
        <div class="activity-title">Activity title goes here <span class="skill-tag">Skill tag</span></div>
        <div class="activity-data"></div>
      </li>
    </ul>
  </div>
</div>`

const menuData = {
  units: [
    {
      prefix: "1",
      title: "How was your vacation?",
      activities: {
        done: 13,
        available: 13
      },
      pointsGot: 82,
      pointsAvailable: 82,
      award: "trophy"
    },
   {
      prefix: "2",
      title: "I think it's exciting!",
      activities: {
        done: 12,
        available: 13
      },
      pointsGot: 71,
      pointsAvailable: 84,
      award: "gold"
    },
   {
      prefix: "3",
      title: "Do it before you're 30!",
      activities: {
        done: 12,
        available: 15
      },
      pointsGot: 64,
      pointsAvailable: 81,
      award: "silver"
    },
   {
      prefix: "R1",
      title: "Review: Units 1–3",
      activities: {
        done: 6,
        available: 6
      },
      pointsGot: 38,
      pointsAvailable: 41,
      award: "gold"
    },    
   {
      prefix: "4",
      title: "The best place in the world!",
      activities: {
        done: 12,
        available: 19
      },
      pointsGot: 55,
      pointsAvailable: 107,
      award: "bronze"
    },
   {
      prefix: "5",
      title: "I think it’s exciting! A whole unit on Rare Stamps: a list of postage stamps that are especially notable in some way, often due to antiquity or a postage stamp error.",
      activities: {
        done: 12,
        available: 19
      },
      pointsGot: 55,
      pointsAvailable: 107,
      award: "bronze"
    },
   {
      prefix: "6",
      title: "The best place in the world!",
      activities: {
        done: 4,
        available: 18
      },
      pointsGot: 14,
      pointsAvailable: 87
    },
   {
      prefix: "R2",
      title: "Review: Units 4–6",
      activities: {
        done: 0,
        available: 6
      },
      pointsGot: 0,
      pointsAvailable: 41,
      notStarted: true
    }    
  ]
}
Handlebars.registerHelper('circle', function(activities) {
  const radius = 17;
  const fraction = (activities.done / activities.available);
  const stroke = Math.PI * (radius + radius);
  return stroke - (fraction * stroke);
});
Handlebars.registerHelper('grey', function(activities) {
  let className = 'not-started'
  if  (activities.done > 0){
    className = ''
  }
  return className;
});

var templateUnit = document.querySelector('.tmpl-unit').innerHTML,
      templateData = menuData,
    templateCompile = Handlebars.compile(templateUnit);
document.querySelector('.unit-list').innerHTML = templateCompile(templateData);

const units = document.querySelectorAll('.unit');

function openUnit(e) {
  const unitDOM = e.currentTarget;
  console.log(e)
  //if not active
  if( ! unitDOM.classList.contains('active') ) {
    //close other active:
    for (var unit of units) {
      if(unit.classList.contains('active') ){
        unit.classList.remove('active');
        unit.querySelector('.lessons').remove(); 
      }
    }
    //mark as active:
    unitDOM.classList.add('active');
    //add fake content:
    const content = document.createElement("div");
    content.classList.add('lessons');
    content.innerHTML = unitBumf
    unitDOM.append(content);
  } else{
    unitDOM.classList.remove('active');
    unitDOM.querySelector('.lessons').remove(); 
  }


}

for (var unit of units) {
  unit.addEventListener('click', openUnit);
}

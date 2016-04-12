function Person(attr) {
  this.gender = attr.gender;
  this.age = attr.age;

};


Person.prototype.assessCooper = function (distance) {
  if (this.gender.toLowerCase() == 'male') {
    this.cooperMessage = this.resultForMale(distance);
  } else {
    this.cooperMessage = this.resultForFemale(distance);
  }
};
Person.prototype.resultForMale = function(distance) {
  var age = this.age;
  switch (true) {
    case (13 <= age && age <= 14):
      switch (true) {
        case (distance < 2100):
          return 'Poor';
        case (2100 <= distance && distance < 2200):
          return 'Below average';
        case (2200 <= distance && distance <  2400):
          return 'Average';
        case (2400 <= distance && distance < 2700):
          return 'Above average';
        case (2700 <= distance):
          return 'Excellent';
      }
      break;


    case (15 <= age && age <= 16):
      switch (true) {
        case (distance < 2200):
          return 'Poor';
        case (2200 <= distance && distance < 2300):
          return 'Below average';
        case (2300 <= distance && distance < 2500):
          return 'Average';
        case (2500 <= distance && distance < 2800):
          return 'Above average';
        case (2800 <= distance):
          return 'Excellent';
      }
      break;


    case (17 <= age && age <=19):
      switch (true) {
        case (distance < 2300):
          return 'Poor';
        case (2300 <= distance && distance < 2500):
          return 'Below average';
        case (2500 <= distance && distance < 2700):
          return 'Average';
        case (2700 <= distance && distance < 3000):
          return 'Above average';
        case (3000 <= distance):
          return 'Excellent';
      }
      break;

    case (20 <= age && age <=29):
      switch (true) {
        case (distance < 1600):
          return 'Poor';
        case (1600 <=  distance && distance < 2200):
          return 'Below average';
        case (2200 <= distance && distance < 2400):
          return 'Average';
        case (2400 <= distance && distance < 2800):
          return 'Above average';
        case (2800 <= distance):
          return 'Excellent';
      }
      break;

    case (30 <= age && age <=39):
      switch (true) {
        case (distance < 1500):
          return 'Poor';
        case (1500 <= distance && distance < 2000):
          return 'Below average';
        case (2000 <= distance && distance < 2300):
          return 'Average';
        case (2300 <= distance && distance < 2700):
          return 'Above average';
        case (2700<= distance):
          return 'Excellent';
      }
      break;

    case (40 <= age && age <= 49):
      switch (true) {
        case (distance < 1400):
          return 'Poor';
        case (1400 <= distance && distance < 1700):
          return 'Below average';
        case (1700 <= distance && distance < 2100):
          return 'Average';
        case (2100 <= distance && distance < 2500):
          return 'Above average';
        case (2500<= distance):
          return 'Excellent';
      }
      break;

    case (age >= 50):
      switch (true) {
        case (distance < 1300):
          return 'Poor';
        case (1300 <= distance && distance < 1600):
          return 'Below average';
        case (1600 <= distance && distance < 2000):
          return 'Average';
        case (2000 <= distance && distance < 2400):
          return 'Above average';
        case (2400 <= distance):
          return 'Excellent';
      }
      break;

  }
}

Person.prototype.resultForFemale = function(distance) {
  var age = this.age;
  switch (true) {
    case (13 <= age && age <= 14):
      switch (true) {
        case (distance < 1500):
          return 'Poor';
        case (1500 <= distance && distance < 1600):
          return 'Below average';
        case (1600 <= distance && distance < 1900):
          return 'Average';
        case (1900 <= distance && distance < 2000):
          return 'Above average';
        case (2000 <= distance):
          return 'Excellent';
      }
      break;


    case (15<= age && age <= 16):
      switch (true) {
        case (distance < 1600):
          return 'Poor';
        case (1600 <= distance && distance < 1700):
          return 'Below average';
        case (1700 <= distance && distance < 2000):
          return 'Average';
        case (2000 <= distance && distance < 2100):
          return 'Above average';
        case (2100 <= distance):
          return 'Excellent';
      }
      break;


    case (17 <= age && age <= 19):
      switch (true) {
        case (distance < 1700):
          return 'Poor';
        case (1700 <= distance && distance < 1800):
          return 'Below average';
        case (1800 <= distance && distance < 2100):
          return 'Average';
        case (2100 <= distance && distance < 2300):
          return 'Above average';
        case (2300 <= distance ):
          return 'Excellent';
      }
      break;

    case (20 <= age && age <= 29):
      switch (true) {
        case (distance < 1500):
          return 'Poor';
        case (1500 <= distance && distance < 1800):
          return 'Below average';
        case (1800 <= distance && distance < 2200):
          return 'Average';
        case (2200 <= distance && distance < 2700):
          return 'Above average';
        case (2700 <= distance):
          return 'Excellent';

      }
      break;

    case (30 <= age && age <= 39):
      switch (true) {
        case (distance < 1400):
          return 'Poor';
        case (1400 <= distance && distance < 1700):
          return 'Below average';
        case (1700 <= distance && distance < 2000):
          return 'Average';
        case (2000 <= distance && distance < 2500):
          return 'Above average';
        case (2500 <= distance):
          return 'Excellent';
      }
      break;

    case (40 <= age && age <= 49):
      switch (true) {
        case (distance < 1200):
          return 'Poor';
        case (1200 <= distance && distance < 1500):
          return 'Below average';
        case (1500 <= distance && distance < 1900):
          return 'Average';
        case (1900 <= distance && distance < 2300):
          return 'Above average';
        case (2300 <= distance):
          return 'Excellent';
      }
      break;

    case (50 <= age ):
      switch (true) {
        case (distance < 1100):
          return 'Poor';
        case (1100<= distance && distance < 1400):
          return 'Below average';
        case (1400 <= distance && distance < 1700):
          return 'Average';
        case (1700 <= distance && distance < 2200):
          return 'Above average';
        case (2200<= distance):
          return 'Excellent';
      }
      break;

  }
};

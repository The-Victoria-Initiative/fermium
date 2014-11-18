// The JS to draw the bar chart, respond to changes in control options
// and to fill in the associated text.
// This is a re-factor of the script written to get the basic 
// functionality working. It will attempt to follow a model, view,
// controller pattern.

// --- MODEL
// Here we load the data into the structures to be manipulated later
var DATA = {};
DATA.growth = [
  {"age":3,   "berry":"a poppy seed",         "height":{"mean":0.08,"low":0.08,"high":0.08},                "weight":{"mean":0.00006,"low":0.00006,"high":0.00006},   "slide":5},
  {"age":4,   "berry":"a sesame seed",        "height":{"mean":0.13,"low":0.13,"high":0.13},                "weight":{"mean":0.00011,"low":0.00011,"high":0.00011},   "slide":6},
  {"age":5,   "berry":"a sunflower seed",     "height":{"mean":0.23,"low":0.23,"high":0.23},                "weight":{"mean":0.00019,"low":0.00019,"high":0.00019},   "slide":7},
  {"age":6,   "berry":"a raisin",             "height":{"mean":0.38,"low":0.38,"high":0.38},                "weight":{"mean":0.00028,"low":0.00028,"high":0.00028},   "slide":8},
  {"age":7,   "berry":"a blueberry",          "height":{"mean":0.79,"low":0.79,"high":0.79},                "weight":{"mean":0.0005,"low":0.0005,"high":0.0005},      "slide":8},
  {"age":8,   "berry":"a raspberry",          "height":{"mean":1.5,"low":1.5,"high":1.5},                   "weight":{"mean":0.001,"low":0.001,"high":0.001},         "slide":9},
  {"age":9,   "berry":"a cherry",             "height":{"mean":2,"low":2,"high":2},                         "weight":{"mean":0.002,"low":0.002,"high":0.002},         "slide":9},
  {"age":10,  "berry":"a strawberry",         "height":{"mean":3,"low":3,"high":3},                         "weight":{"mean":0.0037,"low":0.0037,"high":0.0037},      "slide":10},
  {"age":11,  "berry":"an apricot",           "height":{"mean":4.3,"low":4.3,"high":4.3},                   "weight":{"mean":0.0079,"low":0.0079,"high":0.0079},      "slide":10},
  {"age":12,  "berry":"a lime",               "height":{"mean":5.8,"low":5.8,"high":5.8},                   "weight":{"mean":0.0144,"low":0.0144,"high":0.0144},      "slide":10},
  {"age":13,  "berry":"a plum",               "height":{"mean":7.62,"low":7.62,"high":7.62},                "weight":{"mean":0.0255,"low":0.0255,"high":0.0255},      "slide":11},
  {"age":14,  "berry":"a lemon",              "height":{"mean":8.92,"low":8.22,"high":9.62},                "weight":{"mean":0.0454,"low":0.0454,"high":0.0454},      "slide":11},
  {"age":15,  "berry":"a peach",              "height":{"mean":10.59,"low":9.770952381,"high":11.40904762}, "weight":{"mean":0.0726,"low":0.0726,"high":0.0726},      "slide":11},
  {"age":16,  "berry":"an avocado",           "height":{"mean":11.9,"low":10.96190476,"high":12.83809524},  "weight":{"mean":0.146,"low":0.121,"high":0.171},         "slide":11},
  {"age":17,  "berry":"an apple",             "height":{"mean":13.3,"low":12.24285714,"high":14.35714286},  "weight":{"mean":0.181,"low":0.15,"high":0.212},          "slide":11},
  {"age":18,  "berry":"an orange",            "height":{"mean":14.4,"low":13.22380952,"high":15.57619048},  "weight":{"mean":0.223,"low":0.185,"high":0.261},         "slide":11},
  {"age":19,  "berry":"an onion",             "height":{"mean":15.7,"low":14.4047619,"high":16.9952381},    "weight":{"mean":0.273,"low":0.227,"high":0.319},         "slide":11},
  {"age":20,  "berry":"a pomegranate",        "height":{"mean":26,"low":24.58571429,"high":27.41428571},    "weight":{"mean":0.331,"low":0.275,"high":0.387},         "slide":11},
  {"age":21,  "berry":"a mango",              "height":{"mean":27.1,"low":25.56666667,"high":28.63333333},  "weight":{"mean":0.399,"low":0.331,"high":0.467},         "slide":12},
  {"age":22,  "berry":"a jicama",             "height":{"mean":28,"low":26.34761905,"high":29.65238095},    "weight":{"mean":0.478,"low":0.398,"high":0.559},         "slide":12},
  {"age":23,  "berry":"a grapefruit",         "height":{"mean":29.2,"low":27.42857143,"high":30.97142857},  "weight":{"mean":0.568,"low":0.471,"high":0.665},         "slide":12},
  {"age":24,  "berry":"a coconut",            "height":{"mean":30.5,"low":28.60952381,"high":32.39047619},  "weight":{"mean":0.67,"low":0.556,"high":0.784},          "slide":12},
  {"age":25,  "berry":"a papaya",             "height":{"mean":32.8,"low":30.79047619,"high":34.80952381},  "weight":{"mean":0.785,"low":0.652,"high":0.918},         "slide":13},
  {"age":26,  "berry":"a broccoli",           "height":{"mean":35.5,"low":33.37142857,"high":37.62857143},  "weight":{"mean":0.913,"low":0.758,"high":1.068},         "slide":13},
  {"age":27,  "berry":"a melon",              "height":{"mean":37.3,"low":35.05238095,"high":39.54761905},  "weight":{"mean":1.055,"low":0.876,"high":1.234},         "slide":14},
  {"age":28,  "berry":"an aubergine",         "height":{"mean":38.1,"low":35.73333333,"high":40.46666667},  "weight":{"mean":1.21,"low":1.004,"high":1.416},          "slide":14},
  {"age":29,  "berry":"a spaghetti squash",   "height":{"mean":39.4,"low":36.91428571,"high":41.88571429},  "weight":{"mean":1.379,"low":1.145,"high":1.613},         "slide":14},
  {"age":30,  "berry":"a cauliflower",        "height":{"mean":40.4,"low":37.7952381,"high":43.0047619},    "weight":{"mean":1.559,"low":1.294,"high":1.824},         "slide":15},
  {"age":31,  "berry":"a cabbage",            "height":{"mean":41.5,"low":38.77619048,"high":44.22380952},  "weight":{"mean":1.751,"low":1.453,"high":2.049},         "slide":15},
  {"age":32,  "berry":"a pineapple",          "height":{"mean":43.3,"low":40.45714286,"high":46.14285714},  "weight":{"mean":1.953,"low":1.621,"high":2.285},         "slide":16},
  {"age":33,  "berry":"a honeydew melon",     "height":{"mean":44.8,"low":41.83809524,"high":47.76190476},  "weight":{"mean":2.162,"low":1.794,"high":2.53},          "slide":17},
  {"age":34,  "berry":"a celery",             "height":{"mean":46,"low":42.91904762,"high":49.08095238},    "weight":{"mean":2.377,"low":1.973,"high":2.781},         "slide":17},
  {"age":35,  "berry":"a lettuce",            "height":{"mean":47.3,"low":44.1,"high":50.5},                "weight":{"mean":2.595,"low":2.154,"high":3.036},         "slide":17},
  {"age":36,  "berry":"a cabbage",            "height":{"mean":48.2,"low":44.88095238,"high":51.51904762},  "weight":{"mean":2.813,"low":2.335,"high":3.291},         "slide":17},
  {"age":37,  "berry":"a butternut squash",   "height":{"mean":49.5,"low":46.06190476,"high":52.93809524},  "weight":{"mean":3.028,"low":2.513,"high":3.543},         "slide":17},
  {"age":38,  "berry":"a crenshaw melon",     "height":{"mean":50.7,"low":47.14285714,"high":54.25714286},  "weight":{"mean":3.236,"low":2.686,"high":3.786},         "slide":17},
  {"age":39,  "berry":"a watermelon",         "height":{"mean":51.6,"low":47.92380952,"high":55.27619048},  "weight":{"mean":3.435,"low":2.851,"high":4.019},         "slide":17},
  {"age":40,  "berry":"a pumpkin",            "height":{"mean":52.2,"low":48.4047619,"high":55.9952381},    "weight":{"mean":3.619,"low":3.004,"high":4.234},         "slide":17},
];

DATA.baby_text = {
  5:{"min":3,"max":3,"heading":"3 weeks pregnant","text":"About six days after fertilisation the cluster of cells forms a hollow cavity, known as a blastocyst. The blastocyst burrows itself into the uterus lining. This process is called implantation. The woman is now considered to be three weeks pregnant because it is approximately three weeks since her last period."},
  6:{"min":4,"max":4,"heading":"4 weeks pregnant","text":"The inner group of cells is now called an embryo. The outer cells reach out like roots to link with the mother’s blood supply to form the placenta. The inner cells form into two and then later into three layers. Each of these layers will grow to be different parts of the body."},
  7:{"min":5,"max":5,"heading":"5 weeks pregnant","text":"The cells fold up and round to make a hollow tube called the neural tube. This will become the baby’s brain and spinal cord. By the end of this week, blood circulation will begin and the heart will develop quickly. The woman ‘misses’ her period."},
  8:{"min":6,"max":7,"heading":"6-7 weeks pregnant","text":"The brain is developing distinct areas, and the eyes and ears are beginning to take shape. The heart begins to beat and can be seen beating on an ultrasound scan. Small swellings called ‘limb buds’ show where the arms and legs are growing."},
  9:{"min":8,"max":9,"heading":"8-9 weeks pregnant","text":"The baby is now called a foetus, meaning ‘young one’. The face is slowly forming. The eyes are now more obvious and have some colour in them. There are now the beginnings of hands and feet, with ridges where the fingers and toes will be. The major internal organs are all developing."},
  10:{"min":10,"max":12,"heading":"10-12 weeks pregnant","text":"Just 12 weeks after conception the foetus is fully formed. By now, almost all of the baby’s organs and structures have formed and will continue to grow until delivery. The baby is already moving about, but the movements cannot yet be felt."},
  11:{"min":13,"max":20,"heading":"13-20 weeks pregnant","text":"The baby is now growing quickly. The body grows bigger so that the head and body are more in proportion. The face begins to look much more human and the hair is beginning to grow as well as eyebrows and eyelashes. The eyelids stay closed over the eyes. The steep change in your babies measured size at 20 weeks is actually due a change in how this is measured. Before 20 weeks the size is determined by the crown-rump length (the sitting height) beyond this the head to toe measurement is used."},
  12:{"min":21,"max":24,"heading":"21-24 weeks pregnant","text":"At about 22 weeks the baby becomes covered in a very fine, soft hair called lanugo. The purpose of this is not known, but it is thought that it may be to keep the baby at the right temperature. It may be possible to feel the baby move for the first time."},
  13:{"min":25,"max":26,"heading":"25-26 weeks pregnant","text":"The baby is now moving about vigorously and responds to touch and sound. The baby may also begin to follow a pattern for waking and sleeping. At around 26 weeks the baby’s eyelids open for the first time."},
  14:{"min":27,"max":29,"heading":"27-29 weeks pregnant","text":"The baby’s heartbeat can now be heard through a stethoscope. The baby is now covered in a white greasy substance called vernix. It is thought that this may be to protect the baby’s skin as it floats in the amniotic sac."},
  15:{"min":30,"max":31,"heading":"30-31 weeks pregnant","text":"The baby is growing plumper, so the skin which was quite wrinkled before, is now smoother. Both the vernix and the lanugo begin to disappear."},
  16:{"min":32,"max":32,"heading":"32 weeks pregnant","text":"The baby is now beginning to prepare for birth. He or she will often turn downwards ready for the birth at around this time."},
  17:{"min":33,"max":40,"heading":"33-42 weeks pregnant","text":"Some time before the birth, the head may move down into the pelvis and is said to be ‘engaged’. The average size of a full-term baby is 2.7 to 4.1kgs and 50-53cms long at birth. The placenta is about one-sixth of the baby’s weight, and the umbilical cord is almost as long as the baby."},
};

DATA.conception_dates = {
  "swift":    {"date":new Date(2014,6-1,18),"names":"Nikki & Jamie"},
  "tamsett":  {"date":new Date(2014,9-1,8),"names":"Matthew & Elise"},
  "pat":      {"date":new Date(2014,5-1,16),"names":"Patrick & Catriona"},
  "luigi":    {"date":new Date(2014,8-1,22),"names":"Luigi & Christina"},
  "tom":      {"date":new Date(2014,5-1,13),"names":"Tom & Zainab"},
};

// --- VIEW
// Certain options need to be known before we can completely draw, these
// are set by the controller
var OPTIONS = {};
OPTIONS.conception    = new Date(DATA.conception_dates["tamsett"]["date"]);
OPTIONS.date_options  = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
OPTIONS.due_date      = new Date();
OPTIONS.show_all      = false;
OPTIONS.silly         = false;
OPTIONS.default_max_weeks  = 40;
OPTIONS.default_max_height = 60;
OPTIONS.default_max_weight = 4.5;

// view utility functions
var bisectDate = d3.bisector(function(d) { return d.age; }).left;

// namespace object
var VIEW = {};

// Get the DOM hooks we need
VIEW.container  = d3.select("#line_chart");
VIEW.picture_div= d3.select("#baby_picture");
VIEW.heading    = d3.select("#baby_text_heading");
VIEW.size_text  = d3.select("#baby_text_size");
VIEW.paragraph  = d3.select("#baby_text_paragraph");
VIEW.due_date   = d3.select("#due");
VIEW.parsed     = d3.select("#parsing");

// Setup those drawing components that depend on the view size
VIEW.setup_drawing_dimensions = function() {
  // Borders and size
  VIEW.margin = {top: 50, right: 50, bottom: 50, left: 50};
  if (document.getElementById('line_chart').offsetWidth > 1000){
    VIEW.margin.left = 100;
    VIEW.margin.right = 100;
  }
  VIEW.width  = (document.getElementById('line_chart').offsetWidth - VIEW.margin.left - VIEW.margin.right);
  VIEW.height = (VIEW.width - VIEW.margin.top - VIEW.margin.bottom)/2;
}

VIEW.setup_drawing = function() {
  // Axes
  VIEW.x_weeks  = d3.scale.linear().range([0, VIEW.width]);   // top
  VIEW.x_date   = d3.time.scale()  .range([0, VIEW.width]);   // bottom
  VIEW.y_weight = d3.scale.linear().range([VIEW.height, 0]);  // left
  VIEW.y_height = d3.scale.linear().range([VIEW.height, 0]);  // right

  VIEW.xAxisTop    = d3.svg.axis().scale(VIEW.x_date)   .orient("top").ticks(d3.time.month, VIEW.width>600 ? 1: 3).tickFormat(d3.time.format("%b %y"));
  VIEW.xAxisBottom = d3.svg.axis().scale(VIEW.x_weeks)  .orient("bottom").ticks(VIEW.width>600? 10 : 5);
  VIEW.yAxisLeft   = d3.svg.axis().scale(VIEW.y_weight) .orient("left").ticks(5);
  VIEW.yAxisRight  = d3.svg.axis().scale(VIEW.y_height) .orient("right").ticks(VIEW.width>600? 12: 6); 

  // Axis domains
  VIEW.x_date.domain(d3.extent(DATA.growth, function(d) {
    var temp_date = new Date(OPTIONS.conception.valueOf());
    temp_date.setDate(temp_date.getDate() + (7*parseFloat(d.age)));
    return temp_date; 
  }));

  VIEW.x_weeks .domain([0,OPTIONS.default_max_weeks]);
  VIEW.y_weight.domain([0,OPTIONS.default_max_weight]);
  VIEW.y_height.domain([0,OPTIONS.default_max_height]);

  // The plot lines - these need the axes to setup so are setup here
  VIEW.weight_line = d3.svg.line()
      .x(function(d) { return VIEW.x_weeks(d.age); })
      .y(function(d) { return VIEW.y_weight(d.weight.mean); });

  VIEW.height_line = d3.svg.line()
      .x(function(d) { return VIEW.x_weeks(d.age); })
      .y(function(d) { return VIEW.y_height(d.height.mean); });

  // The plot areas
  VIEW.weight_area = d3.svg.area()
    .x(function(d)  { return VIEW.x_weeks(d.age); })
    .y0(function(d) { return VIEW.y_weight(d.weight.low); })
    .y1(function(d) { return VIEW.y_weight(d.weight.high); });

  VIEW.height_area = d3.svg.area()
    .x(function(d)  { return VIEW.x_weeks(d.age); })
    .y0(function(d) { return VIEW.y_height(d.height.low); })
    .y1(function(d) { return VIEW.y_height(d.height.high); });

  // Add the SVG group to which all components will belong
  VIEW.group = VIEW.container.append("svg")
      .attr("id","content")
      .attr("width", VIEW.width + VIEW.margin.left + VIEW.margin.right)
      .attr("height", VIEW.height + VIEW.margin.top + VIEW.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + VIEW.margin.left + "," + VIEW.margin.top + ")");

  // Add the baby picture
  VIEW.picture = VIEW.picture_div.append("img")
      .attr("class", "img-thumbnail")
      .attr("height","256")
      .attr("width","256")
      .style("display", "none")
      .attr("alt","...");

  // Add the components to the SVG
  VIEW.today_line      = VIEW.group.append("line").attr("class", "today").attr("opacity",1).style("display", "none");
  VIEW.today_textleft  = VIEW.group.append("text").attr("class", "today textleft").attr("opacity",1).style("display", "none");
  VIEW.today_textright = VIEW.group.append("text").attr("class", "today textright").attr("opacity",1).style("display", "none");

  VIEW.focus    = VIEW.group.append("g").style("display", "none"); // defaults to off
  // VIEW.silly_focus     = VIEW.group.append("g").style("display", "none");

  VIEW.all_couples = VIEW.group.append("g").attr("class", "couples").attr("opacity",OPTIONS.show_all ? 1 : 0);
}

VIEW.reset = function(){
  // Reset DOM elements to their defaults
  VIEW.container.selectAll("svg").remove();
  VIEW.picture_div.selectAll("img").remove();
  VIEW.heading.text("");
  VIEW.paragraph.text("Click the plot for a description of your babies development at a given age.");
  VIEW.size_text.text("");
  // Reset drawing booleans
  VIEW.drawn_today_line = false;
}

VIEW.drawn_today_line = false;
VIEW.draw_today_line = function (){
  var today = new Date();
  var timeDiff = Math.abs(today.getTime() - OPTIONS.conception.getTime());
  var diffWeeks = (timeDiff / (1000 * 3600 * 24 * 7));
  var toGo = (40 - diffWeeks)*7;

  if ((diffWeeks >= 3) && (diffWeeks <= 40)){
    // draw for the first time
    if (!VIEW.drawn_today_line){
      VIEW.today_line
          .style("display",null)
          .style("stroke", "grey")
          .style("stroke-width", "2")
          .attr("y1", 0)
          .attr("y2", VIEW.height)
          .attr("x1", VIEW.x_weeks(diffWeeks))
          .attr("x2", VIEW.x_weeks(diffWeeks));

      VIEW.today_textleft
         .style("display",null)
         .attr("x", VIEW.x_weeks(diffWeeks)+10)
         .attr("y", 20)
         .style("fill","grey")
         .style("text-anchor", "start")
         .text("Today");
    
      VIEW.today_textright
         .style("display",null)
         .attr("x", VIEW.x_weeks(diffWeeks)+10)
         .attr("y", 40)
         .style("fill","grey")
         .style("text-anchor", "start")
         .text((toGo).toFixed(0)+" days to go");
      VIEW.drawn_today_line = true;
    } else {
      // Transition
      VIEW.today_line.transition().duration(1500).attr("x1", VIEW.x_weeks(diffWeeks)).attr("x2", VIEW.x_weeks(diffWeeks));
      VIEW.today_textleft.transition().duration(1500).attr("x", VIEW.x_weeks(diffWeeks)+10);
      VIEW.today_textright.transition().duration(1500).attr("x", VIEW.x_weeks(diffWeeks)+10);
      VIEW.today_textright.text((toGo).toFixed(0)+" days to go");
    }
  // hide
  } else {
    VIEW.today_line.style("display","none");
    VIEW.today_textleft.style("display","none");
    VIEW.today_textright.style("display","none");
    VIEW.drawn_today_line = false;
  }
};

// Draw all couple lines
VIEW.draw_all_couples =  function (){
  var colours = ["#563552","#524E67","#6D7F7F","#A8AD8D","#CD7466"];
  var iter = 0;
  for (var name in DATA.conception_dates){
    var this_date = DATA.conception_dates[name]["date"];

    var today = new Date();
    var timePassed = Math.abs(today.getTime() - this_date.getTime());
    var weeksPassed = (timePassed / (1000 * 3600 * 24 * 7));
    var toGo = (40 - weeksPassed)*7;
    
    VIEW.all_couples.append("line")
        .attr("class", "couplesline")
        .style("stroke", colours[iter])
        .attr("y1", 25+(iter*25))
        .attr("y2", VIEW.height)
        .attr("x1", VIEW.x_weeks(weeksPassed))
        .attr("x2", VIEW.x_weeks(weeksPassed));

    VIEW.all_couples.append("text")
        .attr("class", "couplestext")
        .style("fill", colours[iter])
        .attr("y", 25+(iter*25))
        .attr("x", VIEW.x_weeks(weeksPassed)+10)
        .style("text-anchor", "start")
        .text(DATA.conception_dates[name]["names"]);

    VIEW.all_couples.append("text")
        .attr("class", "couplestext")
        .style("fill", colours[iter])
        .attr("y", 45+(iter*25))
        .attr("x", VIEW.x_weeks(weeksPassed)+10)
        .style("text-anchor", "start")
        .text((toGo).toFixed(0)+" days to go");

    iter += 1;
  }
}

VIEW.current_focus = false;
VIEW.silly_rate    = false;
VIEW.silly_height  = false;
VIEW.click = function (){
  var x0 = VIEW.x_weeks.invert(d3.mouse(this)[0]),         
      i = bisectDate(DATA.growth, x0, 1),              
      d0 = DATA.growth[i - 1],                         
      d1 = DATA.growth[i],                             
      d = x0 - d0.age > d1.age - x0 ? d1 : d0;
      i = x0 - d0.age > d1.age - x0 ? i : i-1;
  VIEW.current_focus = d;
  VIEW.draw_focus(d, 1000);
}

VIEW.draw_focus = function (d, transition_time){
  if (d){
    // --- Draw the tool tip
    VIEW.focus.style("display", null);

    VIEW.focus.select("rect.timespan")
        .transition().duration(1000)     
        .attr("x",VIEW.x_weeks(DATA.baby_text[d.slide]["min"]-0.5)) 
        .attr("width",function(){
          return VIEW.x_weeks(Math.min(39.5, DATA.baby_text[d.slide]["max"]) + 0.5 ) - VIEW.x_weeks(DATA.baby_text[d.slide]["min"]-0.5);
        });
    VIEW.focus.select("line.timeline").transition().duration(transition_time)
        .attr("transform","translate(" + VIEW.x_weeks(d.age) + ",0)");
    

    VIEW.focus.select("circle.weight.circle").transition().duration(transition_time)
        .attr("transform",                        
              "translate(" + VIEW.x_weeks(d.age) + "," +    
                             Math.max(VIEW.y_weight(d.weight.mean),VIEW.y_weight(4)) + ")"); 
    VIEW.focus.select("line.weight.line").transition().duration(transition_time)
        .attr("y1", VIEW.y_weight(d.weight.mean))
        .attr("y2", VIEW.y_weight(d.weight.mean))
        .attr("x1", VIEW.x_weeks(d.age))
        .attr("x2", 0);
    VIEW.focus.select("text.weighttext").transition().duration(transition_time)
        .attr("transform",
              "translate("+VIEW.x_weeks(3.5)+"," +VIEW.y_weight(d.weight.mean) + ")")
        .text((d.weight.mean*1000).toFixed(0)+" g");

    if (!OPTIONS.silly){
      VIEW.focus.select("circle.height.circle").transition().duration(transition_time)                 
          .attr("transform",                        
                "translate(" + VIEW.x_weeks(d.age) + "," +    
                               VIEW.y_height(d.height.mean) + ")");   
      VIEW.focus.select("line.height.line").transition().duration(transition_time)
          .attr("y1", VIEW.y_height(d.height.mean))
          .attr("y2", VIEW.y_height(d.height.mean))
          .attr("x1", VIEW.x_weeks(d.age))
          .attr("x2", VIEW.width);
      VIEW.focus.select("text.heighttext").transition().duration(transition_time)
          .attr("transform",
                "translate(" + (VIEW.width-5) + "," +
                               Math.max(VIEW.y_height(d.height.mean),VIEW.y_height(55)) + ")")
          .text((d.height.mean*1).toFixed(0)+" cm");
    } else {
      // Silly extrapolations
      var indexOfCurrentFocus = DATA.growth.indexOf(d);
      console.log(indexOfCurrentFocus);
      var nextIndex = Math.min(DATA.growth.length-1,indexOfCurrentFocus+1);
      console.log(nextIndex);
      var height_0 = d.height.mean;
      var height_1 = DATA.growth[nextIndex].height.mean;
      var d_height = height_1 / height_0;
      var height_max = height_0 * (Math.pow(d_height,(40-d.age)));
      VIEW.rescale_height_axis(height_max,transition_time);
      VIEW.silly_rate   = d_height.toFixed(1);
      VIEW.silly_height = height_max.toFixed(1);
    }
    // --- Add the picture and text
    VIEW.picture
      .style("display", null)
      .attr("src", function(){
        return "/fermium/02/images/slideshow_"+d.slide+".jpg";
      });
      // .style("filter", "url(#drop-shadow)");

    VIEW.heading.text( function () {
      return DATA.baby_text[parseInt(d.slide)]["heading"];
    });

    VIEW.size_text.text(function(){
      var line = ""
      if (!OPTIONS.show_all){
        line += "At "+d.age+" weeks, on ";
        var temp_date = new Date(OPTIONS.conception.valueOf());
        temp_date.setDate(temp_date.getDate() + (7*parseFloat(d.age)));
        line += temp_date.toLocaleDateString("en-Uk",OPTIONS.date_options);
        line += ", your baby will be the size of "+d.berry+". ";
      }
      if (VIEW.silly_rate){
        line += "In the last week your baby has increased in size by a factor of: "+VIEW.silly_rate;
        line = line + ". If they keep growth at this rate they'll be "+VIEW.silly_height+" cm tall by the time they're born."
      }
      return line;
    });

    VIEW.paragraph.text( function () {
      return DATA.baby_text[parseInt(d.slide)]["text"];
  });
  } else {
    VIEW.focus.style("display", "none");
  }
};

VIEW.draw = function(){
  // -- Axes
  VIEW.group.append("g")
      .attr("class", "x axis top")
      .attr("opacity",OPTIONS.show_all ? 0 : 1)
      .call(VIEW.xAxisTop);

  VIEW.group.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + VIEW.height + ")")
      .call(VIEW.xAxisBottom)
    .append("text")
      .attr("transform", "translate("+(VIEW.width-80)+",0)")
      .attr("y", 40)
      .text("Age [weeks]");

  VIEW.group.append("g")
      .attr("class", "y axis left")
      .call(VIEW.yAxisLeft)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      .style("text-anchor", "end")
      .text("Weight [kg]");

  VIEW.group.append("g")
      .attr("class", "y axis right")
      .attr("transform", "translate(" + VIEW.width + " ,0)") 
      .call(VIEW.yAxisRight)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 40)
      .attr("dy", ".1em")
      .style("text-anchor", "end")
      .text("Size [cm]");

  // --- Error areas
  VIEW.group.append("path")
     .datum(DATA.growth)
     .attr("class", "weightarea")
     .attr("d", VIEW.weight_area);

  VIEW.group.append("path")
     .datum(DATA.growth)
     .attr("class", "heightarea")
     .attr("d", VIEW.height_area);

  // --- Lines
  VIEW.group.append("path")
      .attr("class", "weight")
      .attr("d", VIEW.weight_line(DATA.growth));

  VIEW.group.append("path")
      .attr("class", "height")
      .attr("d", VIEW.height_line(DATA.growth));

  // --- Tool tip
  VIEW.focus.append("rect")
       .attr("class","timespan")
       .attr("fill","grey")
       .attr("y",0)
       .attr("height",VIEW.height)
       .style("opacity",0.1);
  VIEW.focus.append("line")
      .attr("class", "timeline")
      .style("stroke", "grey")
      .style("stroke-dasharray", "3,3")
      .style("stroke-width", "2")
      .style("opacity", 1.)
      .attr("y1", 0)
      .attr("y2", VIEW.height);

  VIEW.focus.append("circle")                            
      .attr("class", "weight circle")                           
      .style("fill", "none")                        
      .style("stroke", "#428bca")   
      .style("stroke-width", "2")                   
      .attr("r", 4); 
  VIEW.focus.append("line")
      .attr("class", "weight line")
      .style("stroke", "#428bca")
      .style("stroke-dasharray", "3,3")
      .style("stroke-width", "2")                      
      .style("opacity", 1.)
      .attr("x1", VIEW.width)
      .attr("x2", VIEW.width);
  VIEW.focus.append("text")
      .attr("class", "weighttext")
      .attr("y", -10)
      .attr("text-anchor","start")
      .style("fill", "#428bca");

  VIEW.focus.append("circle")                            
      .attr("class", "height circle")                           
      .style("fill", "none")                        
      .style("stroke", "#5cb85c") 
      .style("stroke-width", "2")                     
      .attr("r", 4);
  VIEW.focus.append("line")
      .attr("class", "height line")
      .style("stroke", "#5cb85c")
      .style("stroke-dasharray", "3,3")
      .style("stroke-width", "2")
      .style("opacity", 1.)
      .attr("x1", VIEW.width)
      .attr("x2", VIEW.width);   
  VIEW.focus.append("text")
      .attr("class", "heighttext")
      .attr("y", -10)
      .attr("text-anchor","end")
      .style("fill", "#5cb85c");

  // --- append the rectangle to capture mouse          
  VIEW.group.append("rect")                                
      .attr("width", VIEW.width)                         
      .attr("height", VIEW.height)                       
      .style("fill", "none")                        
      .style("pointer-events", "all")               
      // .on("click", OPTIONS.silly? VIEW.click: VIEW.sillyclick);  
      .on("click", VIEW.click); 

  // --- Add in the line for today
  if (!OPTIONS.show_all){
    VIEW.draw_today_line();
  }
  // --- Draw all
  VIEW.draw_all_couples();
};

VIEW.rescale_date_axis = function (){
  var end_date = new Date(OPTIONS.conception.valueOf());
  end_date.setDate(end_date.getDate() + (7*40));
  VIEW.x_date.domain([OPTIONS.conception,end_date]);
  var t = VIEW.container.transition().duration(1500);
  t.select(".x.axis.top").call(VIEW.xAxisTop);
}

VIEW.rescale_height_axis = function (max_height, transition_time){
  // Rescale the axis
  VIEW.y_height.domain([0,max_height]);
  VIEW.group.select(".y.axis.right").transition().duration(transition_time).call(VIEW.yAxisRight);
  VIEW.group.select("path.height").transition().duration(transition_time).attr("d", VIEW.height_line(DATA.growth));
  VIEW.group.select("path.heightarea").transition().duration(transition_time).attr("d", VIEW.height_area);

  // Move the focus tool tip
  VIEW.focus.select("circle.height.circle").transition().duration(transition_time)                 
      .attr("transform",                        
            "translate(" + VIEW.x_weeks(VIEW.current_focus.age) + "," +    
                           VIEW.y_height(VIEW.current_focus.height.mean) + ")");   
  
  VIEW.focus.select("line.height.line").transition().duration(transition_time)
      .attr("y1", VIEW.y_height(VIEW.current_focus.height.mean))
      .attr("y2", OPTIONS.silly ? VIEW.y_height(max_height) : VIEW.y_height(VIEW.current_focus.height.mean))
      .attr("x1", VIEW.x_weeks(VIEW.current_focus.age))
      .attr("x2", VIEW.width);
  
  VIEW.focus.select("text.heighttext").transition().duration(transition_time)
      .attr("transform",
            "translate(" + (VIEW.width-5) + "," +
                           (OPTIONS.silly ? VIEW.y_height(max_height) : Math.max(VIEW.y_height(VIEW.current_focus.height.mean),VIEW.y_height(55))) + ")")
      .text(OPTIONS.silly ? (max_height*1).toFixed(0)+" cm" : (VIEW.current_focus.height.mean*1).toFixed(0)+" cm");
}


// --- Draw the view
window.onload = function(){
  VIEW.setup_drawing_dimensions();
  VIEW.setup_drawing();
  VIEW.draw();
  CONTROLS.setup_due_date();
};

window.addEventListener('resize', function(){
  VIEW.reset();
  VIEW.setup_drawing_dimensions();
  VIEW.setup_drawing();
  VIEW.draw();
  if (VIEW.current_focus){
    VIEW.draw_focus(VIEW.current_focus,0);
  }
  CONTROLS.setup_due_date();
});

// --- CONTROLS
// Here we read from the form in the web page to determine what to draw
// Interact with the form
var CONTROLS = {};
CONTROLS.input_text = d3.select("#inputPeriod");
CONTROLS.input_list = d3.select("#inputList");
CONTROLS.show_all   = d3.select("#showAll");
CONTROLS.silly      = d3.select("#silly");

CONTROLS.isValidDate = function(s) {
  var bits = s.split('/');
  var d = new Date(bits[2], bits[1] - 1, bits[0]);
  return d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]);
} 

CONTROLS.setup_due_date = function(){
  OPTIONS.due_date = new Date(OPTIONS.conception.getTime() + 40*7*24*60*60*1000);
  VIEW.due_date.attr("class","alert alert-success").text("Due date: "+OPTIONS.due_date.toLocaleDateString("en-Uk",OPTIONS.date_options));
  if (VIEW.current_focus){
    VIEW.draw_focus(VIEW.current_focus, 0);
  }
}

// Due date input from text box
CONTROLS.input_text.on("input", function() {
  var text = this.value;
  var substrings = text.split("/");
  var day = "dd";
  var month = "mm";
  var year = "yyyy";

  if ( (substrings.length != 3) || (substrings[2].length != 4) ){
    VIEW.parsed.text("e.g. "+day+"/"+month+"/"+year)
          .attr("class","alert alert-warning")
          .attr("role","alert");
  } else {
    day = parseInt(substrings[0]);
    month = parseInt(substrings[1]);
    year = parseInt(substrings[2]);
    var string_date = day+"/"+month+"/"+year;
    if (CONTROLS.isValidDate(string_date)){
      OPTIONS.conception = new Date(year,month-1,day);
      
      // Redraw the date axis and today line
      VIEW.rescale_date_axis();
      VIEW.draw_today_line();

      VIEW.parsed.attr("class","alert alert-success")
            .text("Last period: "+OPTIONS.conception.toLocaleDateString("en-Uk",OPTIONS.date_options));
      CONTROLS.setup_due_date();
    } else {
      VIEW.parsed.attr("class","alert alert-danger")
            .text("Invalid date, day: "+day+", month: "+month+", year: "+year);
    }
  }
});

// Due date input from list
CONTROLS.input_list.on("change", function() {
  var text = this.value;
  // console.log(text);
  OPTIONS.conception = new Date(DATA.conception_dates[text]["date"]);

  // Redraw the date axis and today line
  VIEW.rescale_date_axis();
  VIEW.draw_today_line();

  VIEW.parsed.attr("class","alert alert-success")
         .text("Last period: "+OPTIONS.conception.toLocaleDateString("en-Uk",OPTIONS.date_options));
  CONTROLS.setup_due_date();
});

// Checkbox options
// Show all
CONTROLS.show_all.on("change", function() {
  if (this.checked){
    OPTIONS.show_all = true;
    // Switch to show all mode
    VIEW.today_line.transition().duration(1500).attr("opacity",0);
    VIEW.today_textleft.transition().duration(1500).attr("opacity",0);
    VIEW.today_textright.transition().duration(1500).attr("opacity",0);
    d3.selectAll(".x.axis.top").transition().duration(1500).attr("opacity",0);

    VIEW.all_couples.transition().duration(1500).attr("opacity",1);
    VIEW.current_focus = false;
    VIEW.draw_focus(VIEW.current_focus,0);
  } else {
    OPTIONS.show_all = false;
    // Switch back to previous mode
    VIEW.today_line.transition().duration(1500).attr("opacity",1);
    VIEW.today_textleft.transition().duration(1500).attr("opacity",1);
    VIEW.today_textright.transition().duration(1500).attr("opacity",1);
    d3.selectAll(".x.axis.top").transition().duration(1500).attr("opacity",1);

    VIEW.all_couples.transition().duration(1500).attr("opacity",0);
    VIEW.current_focus = false;
    VIEW.draw_focus(VIEW.current_focus,0);
  }
});

// Silly extrapolations
CONTROLS.silly.on("change", function() {
  if (this.checked){
    OPTIONS.silly = true;
    // Switch to silly
    VIEW.today_line.transition().duration(1500).attr("opacity",0);
    VIEW.today_textleft.transition().duration(1500).attr("opacity",0);
    VIEW.today_textright.transition().duration(1500).attr("opacity",0);
    d3.selectAll(".x.axis.top").transition().duration(1500).attr("opacity",0);

    VIEW.current_focus = false;
    VIEW.draw_focus(VIEW.current_focus,0);
  } else {
    OPTIONS.silly = false;
    VIEW.silly_rate = false;
    VIEW.silly_height = false;
    // Switch back to previous mode
    if (!OPTIONS.show_all){
      VIEW.today_line.transition().duration(1500).attr("opacity",1);
      VIEW.today_textleft.transition().duration(1500).attr("opacity",1);
      VIEW.today_textright.transition().duration(1500).attr("opacity",1);
      d3.selectAll(".x.axis.top").transition().duration(1500).attr("opacity",1);
    }
    // silly_focus.style("display", "none");

    // -- Rescale size axis to default
    VIEW.rescale_height_axis(OPTIONS.default_max_height,1500);

    VIEW.current_focus = false;
    VIEW.draw_focus(VIEW.current_focus,0);
  }
});
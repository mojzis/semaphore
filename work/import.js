var prefix = "\"28,1|0,23|0,0|-1,-36|1,-3|-3,-45|-17,-85|-28,-112|4,-87|9,-116";
var suffix = "\"";
//var sem = {"bottom":       "|0,-27|0,-50",
//           "bottomLeft":   "|-19,-19|-35,-35",
//           "left":         "|-27,0|-50,0",
//           "topLeft":      "|-19,19|-35,35",
//           "top":          "|0,27|0,50",
//           "topRight":     "|19,19|35,35",
//           "right":        "|27,0|50,0",
//           "bottomRight":  "|19,-19|35,-35"
//};
var sem = { "bottomR":      "|-3,-33|0,-60", // right hand
            "bottomL":      "|3,-33|0,-60", // left hand
            "bottomLeft":   "|-23,-30|-42,-42",
            "left":         "|-33,-2|-60,0",
            "topLeft":      "|-23,20|-42,42",
            "topR":         "|-3,33|0,60",
            "topL":         "|3,33|0,60",
            "topRight":     "|23,20|42,42",
            "right":        "|33,-2|60,0",
            "bottomRight":  "|23,-30|42,-42"
};
var poses = [
    {letter: "A", pose: prefix + sem.bottomLeft  + sem.bottomL     + suffix},
    {letter: "B", pose: prefix + sem.left        + sem.bottomL     + suffix},
    {letter: "C", pose: prefix + sem.topLeft     + sem.bottomL     + suffix},
    {letter: "D", pose: prefix + sem.topR        + sem.bottomL     + suffix},
    {letter: "E", pose: prefix + sem.bottomR     + sem.topRight    + suffix},
    {letter: "F", pose: prefix + sem.bottomR     + sem.right       + suffix},
    {letter: "G", pose: prefix + sem.bottomR     + sem.bottomRight + suffix},
    {letter: "H", pose: prefix + sem.left        + sem.bottomLeft  + suffix},
    {letter: "I", pose: prefix + sem.topLeft     + sem.bottomLeft  + suffix},
    {letter: "J", pose: prefix + sem.topR        + sem.right       + suffix},
    {letter: "K", pose: prefix + sem.bottomLeft  + sem.topL        + suffix},
    {letter: "L", pose: prefix + sem.bottomLeft  + sem.topRight    + suffix},
    {letter: "M", pose: prefix + sem.bottomLeft  + sem.right       + suffix},
    {letter: "N", pose: prefix + sem.bottomLeft  + sem.bottomRight + suffix},
    {letter: "O", pose: prefix + sem.topLeft     + sem.left        + suffix},
    {letter: "P", pose: prefix + sem.left        + sem.topL        + suffix},
    {letter: "Q", pose: prefix + sem.left        + sem.topRight    + suffix},
    {letter: "R", pose: prefix + sem.left        + sem.right       + suffix},
    {letter: "S", pose: prefix + sem.left        + sem.bottomRight + suffix},
    {letter: "T", pose: prefix + sem.topLeft     + sem.topL        + suffix},
    {letter: "U", pose: prefix + sem.topLeft     + sem.topRight    + suffix},
    {letter: "V", pose: prefix + sem.topR        + sem.bottomRight + suffix},
    {letter: "W", pose: prefix + sem.right       + sem.topRight    + suffix},
    {letter: "X", pose: prefix + sem.bottomRight + sem.topRight    + suffix},
    {letter: "Y", pose: prefix + sem.topLeft     + sem.right       + suffix},
    {letter: "Z", pose: prefix + sem.bottomRight + sem.right       + suffix},
    {letter: "EOW", pose: prefix + sem.bottomR     + sem.bottomL     + suffix},
    {letter: "EOM", pose: prefix + sem.left        + sem.right       + suffix}
];

db = connect("hk_com");
poses.forEach(function(row){
    db.poses.insert(row, {safe: true});
});
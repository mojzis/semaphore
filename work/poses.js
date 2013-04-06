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
var poses = {
    "A": prefix + sem.bottomLeft  + sem.bottomL     + suffix,
    "B": prefix + sem.left        + sem.bottomL     + suffix,
    "C": prefix + sem.topLeft     + sem.bottomL     + suffix,
    "D": prefix + sem.topR        + sem.bottomL     + suffix,
    "E": prefix + sem.bottomR     + sem.topRight    + suffix,
    "F": prefix + sem.bottomR     + sem.right       + suffix,
    "G": prefix + sem.bottomR     + sem.bottomRight + suffix,
    "H": prefix + sem.left        + sem.bottomLeft  + suffix,
    "I": prefix + sem.topLeft     + sem.bottomLeft  + suffix,
    "J": prefix + sem.topR        + sem.right       + suffix,
    "K": prefix + sem.bottomLeft  + sem.topL        + suffix,
    "L": prefix + sem.bottomLeft  + sem.topRight    + suffix,
    "M": prefix + sem.bottomLeft  + sem.right       + suffix,
    "N": prefix + sem.bottomLeft  + sem.bottomRight + suffix,
    "O": prefix + sem.topLeft     + sem.left        + suffix,
    "P": prefix + sem.left        + sem.topL        + suffix,
    "Q": prefix + sem.left        + sem.topRight    + suffix,
    "R": prefix + sem.left        + sem.right       + suffix,
    "S": prefix + sem.left        + sem.bottomRight + suffix,
    "T": prefix + sem.topLeft     + sem.topL        + suffix,
    "U": prefix + sem.topLeft     + sem.topRight    + suffix,
    "V": prefix + sem.topR        + sem.bottomRight + suffix,
    "W": prefix + sem.right       + sem.topRight    + suffix,
    "X": prefix + sem.bottomRight + sem.topRight    + suffix,
    "Y": prefix + sem.topLeft     + sem.right       + suffix,
    "Z": prefix + sem.bottomRight + sem.right       + suffix,
  "EOW": prefix + sem.bottomR     + sem.bottomL     + suffix,
  "EOM": prefix + sem.left        + sem.right       + suffix
};
var hackathon = poses.H + "," + poses.A + "," + poses.C + "," + poses.K + "," + poses.A + "," + poses.T + "," + poses.H + "," + poses.O + "," + poses.N;

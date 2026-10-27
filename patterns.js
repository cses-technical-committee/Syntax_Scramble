/**
 * THINK FORGE — SYNTAX SCRAMBLE
 * patterns.js — 15 Official Event Pattern Programs
 * 
 * All 15 challenges for live college coding competition.
 * Programs use nested loops with n = 5 in both Python and C++.
 * No difficulty levels are assigned so all challenges stand on equal footing.
 */

const PATTERNS_DATA = [
  // =========================================================================
  // CHALLENGE 01 (Pattern 3: Decreasing Star Triangle)
  // =========================================================================
  {
    id: 1,
    number: "01",
    title: "Decreasing Star Triangle",
    description: "Reconstruct the nested loops to print decreasing rows of stars for n = 5.",
    output: [
      "* * * * *",
      "* * * *",
      "* * *",
      "* *",
      "*"
    ],
    languages: {
      python: {
        lines: [
          { id: "p1_py_1", text: "n = 5", mapsTo: "p1_cpp_4" },
          { id: "p1_py_2", text: "for flux in range(n, 0, -1):", mapsTo: "p1_cpp_5" },
          { id: "p1_py_3", text: "    for nova in range(flux):", mapsTo: "p1_cpp_6" },
          { id: "p1_py_4", text: "        print(\"*\", end=\" \")", mapsTo: "p1_cpp_7" },
          { id: "p1_py_5", text: "    print()", mapsTo: "p1_cpp_9" }
        ],
        solutionOrder: ["p1_py_1", "p1_py_2", "p1_py_3", "p1_py_4", "p1_py_5"],
        indentationLevels: {
          "p1_py_1": 0,
          "p1_py_2": 0,
          "p1_py_3": 1,
          "p1_py_4": 2,
          "p1_py_5": 1
        }
      },
      cpp: {
        lines: [
          { id: "p1_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p1_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p1_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p1_cpp_4", text: "    int n = 5;", mapsTo: "p1_py_1" },
          { id: "p1_cpp_5", text: "    for (int flux = n; flux >= 1; flux--) {", mapsTo: "p1_py_2" },
          { id: "p1_cpp_6", text: "        for (int nova = 1; nova <= flux; nova++) {", mapsTo: "p1_py_3" },
          { id: "p1_cpp_7", text: "            cout << \"* \";", mapsTo: "p1_py_4" },
          { id: "p1_cpp_8", text: "        }", mapsTo: null },
          { id: "p1_cpp_9", text: "        cout << endl;", mapsTo: "p1_py_5" },
          { id: "p1_cpp_10", text: "    }", mapsTo: null },
          { id: "p1_cpp_11", text: "    return 0;", mapsTo: null },
          { id: "p1_cpp_12", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p1_cpp_1", "p1_cpp_2", "p1_cpp_3", "p1_cpp_4", "p1_cpp_5", "p1_cpp_6", "p1_cpp_7", "p1_cpp_8", "p1_cpp_9", "p1_cpp_10", "p1_cpp_11", "p1_cpp_12"],
        indentationLevels: {
          "p1_cpp_1": 0,
          "p1_cpp_2": 0,
          "p1_cpp_3": 0,
          "p1_cpp_4": 1,
          "p1_cpp_5": 1,
          "p1_cpp_6": 2,
          "p1_cpp_7": 3,
          "p1_cpp_8": 2,
          "p1_cpp_9": 2,
          "p1_cpp_10": 1,
          "p1_cpp_11": 1,
          "p1_cpp_12": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 02 (Pattern 4: Right-Aligned Increasing Star Triangle)
  // =========================================================================
  {
    id: 2,
    number: "02",
    title: "Right-Aligned Increasing Star Triangle",
    description: "Reconstruct loops that print right-aligned stars using conditional spacing for n = 5.",
    output: [
      "        *",
      "      * *",
      "    * * *",
      "  * * * *",
      "* * * * *"
    ],
    languages: {
      python: {
        lines: [
          { id: "p2_py_1", text: "n = 5", mapsTo: "p2_cpp_4" },
          { id: "p2_py_2", text: "for orbit in range(1, n + 1):", mapsTo: "p2_cpp_5" },
          { id: "p2_py_3", text: "    for echo in range(1, n + 1):", mapsTo: "p2_cpp_6" },
          { id: "p2_py_4", text: "        if echo <= n - orbit:", mapsTo: "p2_cpp_7" },
          { id: "p2_py_5", text: "            print(\"  \", end=\"\")", mapsTo: "p2_cpp_8" },
          { id: "p2_py_6", text: "        else:", mapsTo: "p2_cpp_9" },
          { id: "p2_py_7", text: "            print(\"* \", end=\"\")", mapsTo: "p2_cpp_10" },
          { id: "p2_py_8", text: "    print()", mapsTo: "p2_cpp_13" }
        ],
        solutionOrder: ["p2_py_1", "p2_py_2", "p2_py_3", "p2_py_4", "p2_py_5", "p2_py_6", "p2_py_7", "p2_py_8"],
        indentationLevels: {
          "p2_py_1": 0,
          "p2_py_2": 0,
          "p2_py_3": 1,
          "p2_py_4": 2,
          "p2_py_5": 3,
          "p2_py_6": 2,
          "p2_py_7": 3,
          "p2_py_8": 1
        }
      },
      cpp: {
        lines: [
          { id: "p2_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p2_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p2_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p2_cpp_4", text: "    int n = 5;", mapsTo: "p2_py_1" },
          { id: "p2_cpp_5", text: "    for (int orbit = 1; orbit <= n; orbit++) {", mapsTo: "p2_py_2" },
          { id: "p2_cpp_6", text: "        for (int echo = 1; echo <= n; echo++) {", mapsTo: "p2_py_3" },
          { id: "p2_cpp_7", text: "            if (echo <= n - orbit) {", mapsTo: "p2_py_4" },
          { id: "p2_cpp_8", text: "                cout << \"  \";", mapsTo: "p2_py_5" },
          { id: "p2_cpp_9", text: "            } else {", mapsTo: "p2_py_6" },
          { id: "p2_cpp_10", text: "                cout << \"* \";", mapsTo: "p2_py_7" },
          { id: "p2_cpp_11", text: "            }", mapsTo: null },
          { id: "p2_cpp_12", text: "        }", mapsTo: null },
          { id: "p2_cpp_13", text: "        cout << endl;", mapsTo: "p2_py_8" },
          { id: "p2_cpp_14", text: "    }", mapsTo: null },
          { id: "p2_cpp_15", text: "    return 0;", mapsTo: null },
          { id: "p2_cpp_16", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p2_cpp_1", "p2_cpp_2", "p2_cpp_3", "p2_cpp_4", "p2_cpp_5", "p2_cpp_6", "p2_cpp_7", "p2_cpp_8", "p2_cpp_9", "p2_cpp_10", "p2_cpp_11", "p2_cpp_12", "p2_cpp_13", "p2_cpp_14", "p2_cpp_15", "p2_cpp_16"],
        indentationLevels: {
          "p2_cpp_1": 0,
          "p2_cpp_2": 0,
          "p2_cpp_3": 0,
          "p2_cpp_4": 1,
          "p2_cpp_5": 1,
          "p2_cpp_6": 2,
          "p2_cpp_7": 3,
          "p2_cpp_8": 4,
          "p2_cpp_9": 3,
          "p2_cpp_10": 4,
          "p2_cpp_11": 3,
          "p2_cpp_12": 2,
          "p2_cpp_13": 2,
          "p2_cpp_14": 1,
          "p2_cpp_15": 1,
          "p2_cpp_16": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 03 (Pattern 5: Right-Aligned Decreasing Star Triangle)
  // =========================================================================
  {
    id: 3,
    number: "03",
    title: "Right-Aligned Decreasing Star Triangle",
    description: "Reconstruct loops that print right-aligned stars with inverted spacing for n = 5.",
    output: [
      "* * * * *",
      "  * * * *",
      "    * * *",
      "      * *",
      "        *"
    ],
    languages: {
      python: {
        lines: [
          { id: "p3_py_1", text: "n = 5", mapsTo: "p3_cpp_4" },
          { id: "p3_py_2", text: "for pixel in range(1, n + 1):", mapsTo: "p3_cpp_5" },
          { id: "p3_py_3", text: "    for flux in range(1, n + 1):", mapsTo: "p3_cpp_6" },
          { id: "p3_py_4", text: "        if flux < pixel:", mapsTo: "p3_cpp_7" },
          { id: "p3_py_5", text: "            print(\"  \", end=\"\")", mapsTo: "p3_cpp_8" },
          { id: "p3_py_6", text: "        else:", mapsTo: "p3_cpp_9" },
          { id: "p3_py_7", text: "            print(\"* \", end=\"\")", mapsTo: "p3_cpp_10" },
          { id: "p3_py_8", text: "    print()", mapsTo: "p3_cpp_13" }
        ],
        solutionOrder: ["p3_py_1", "p3_py_2", "p3_py_3", "p3_py_4", "p3_py_5", "p3_py_6", "p3_py_7", "p3_py_8"],
        indentationLevels: {
          "p3_py_1": 0,
          "p3_py_2": 0,
          "p3_py_3": 1,
          "p3_py_4": 2,
          "p3_py_5": 3,
          "p3_py_6": 2,
          "p3_py_7": 3,
          "p3_py_8": 1
        }
      },
      cpp: {
        lines: [
          { id: "p3_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p3_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p3_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p3_cpp_4", text: "    int n = 5;", mapsTo: "p3_py_1" },
          { id: "p3_cpp_5", text: "    for (int pixel = 1; pixel <= n; pixel++) {", mapsTo: "p3_py_2" },
          { id: "p3_cpp_6", text: "        for (int flux = 1; flux <= n; flux++) {", mapsTo: "p3_py_3" },
          { id: "p3_cpp_7", text: "            if (flux < pixel) {", mapsTo: "p3_py_4" },
          { id: "p3_cpp_8", text: "                cout << \"  \";", mapsTo: "p3_py_5" },
          { id: "p3_cpp_9", text: "            } else {", mapsTo: "p3_py_6" },
          { id: "p3_cpp_10", text: "                cout << \"* \";", mapsTo: "p3_py_7" },
          { id: "p3_cpp_11", text: "            }", mapsTo: null },
          { id: "p3_cpp_12", text: "        }", mapsTo: null },
          { id: "p3_cpp_13", text: "        cout << endl;", mapsTo: "p3_py_8" },
          { id: "p3_cpp_14", text: "    }", mapsTo: null },
          { id: "p3_cpp_15", text: "    return 0;", mapsTo: null },
          { id: "p3_cpp_16", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p3_cpp_1", "p3_cpp_2", "p3_cpp_3", "p3_cpp_4", "p3_cpp_5", "p3_cpp_6", "p3_cpp_7", "p3_cpp_8", "p3_cpp_9", "p3_cpp_10", "p3_cpp_11", "p3_cpp_12", "p3_cpp_13", "p3_cpp_14", "p3_cpp_15", "p3_cpp_16"],
        indentationLevels: {
          "p3_cpp_1": 0,
          "p3_cpp_2": 0,
          "p3_cpp_3": 0,
          "p3_cpp_4": 1,
          "p3_cpp_5": 1,
          "p3_cpp_6": 2,
          "p3_cpp_7": 3,
          "p3_cpp_8": 4,
          "p3_cpp_9": 3,
          "p3_cpp_10": 4,
          "p3_cpp_11": 3,
          "p3_cpp_12": 2,
          "p3_cpp_13": 2,
          "p3_cpp_14": 1,
          "p3_cpp_15": 1,
          "p3_cpp_16": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 04 (Pattern 6: Star Pyramid)
  // =========================================================================
  {
    id: 4,
    number: "04",
    title: "Star Pyramid",
    description: "Reconstruct spacing and star loops for a symmetrical centered pyramid.",
    output: [
      "    *",
      "   * *",
      "  * * *",
      " * * * *",
      "* * * * *"
    ],
    languages: {
      python: {
        lines: [
          { id: "p4_py_1", text: "n = 5", mapsTo: "p4_cpp_4" },
          { id: "p4_py_2", text: "for nova in range(1, n + 1):", mapsTo: "p4_cpp_5" },
          { id: "p4_py_3", text: "    for orbit in range(n - nova):", mapsTo: "p4_cpp_6" },
          { id: "p4_py_4", text: "        print(\" \", end=\"\")", mapsTo: "p4_cpp_7" },
          { id: "p4_py_5", text: "    for orbit in range(1, nova + 1):", mapsTo: "p4_cpp_9" },
          { id: "p4_py_6", text: "        print(\"* \", end=\"\")", mapsTo: "p4_cpp_10" },
          { id: "p4_py_7", text: "    print()", mapsTo: "p4_cpp_12" }
        ],
        solutionOrder: ["p4_py_1", "p4_py_2", "p4_py_3", "p4_py_4", "p4_py_5", "p4_py_6", "p4_py_7"],
        indentationLevels: {
          "p4_py_1": 0,
          "p4_py_2": 0,
          "p4_py_3": 1,
          "p4_py_4": 2,
          "p4_py_5": 1,
          "p4_py_6": 2,
          "p4_py_7": 1
        }
      },
      cpp: {
        lines: [
          { id: "p4_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p4_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p4_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p4_cpp_4", text: "    int n = 5;", mapsTo: "p4_py_1" },
          { id: "p4_cpp_5", text: "    for (int nova = 1; nova <= n; nova++) {", mapsTo: "p4_py_2" },
          { id: "p4_cpp_6", text: "        for (int orbit = 1; orbit <= n - nova; orbit++) {", mapsTo: "p4_py_3" },
          { id: "p4_cpp_7", text: "            cout << \" \";", mapsTo: "p4_py_4" },
          { id: "p4_cpp_8", text: "        }", mapsTo: null },
          { id: "p4_cpp_9", text: "        for (int orbit = 1; orbit <= nova; orbit++) {", mapsTo: "p4_py_5" },
          { id: "p4_cpp_10", text: "            cout << \"* \";", mapsTo: "p4_py_6" },
          { id: "p4_cpp_11", text: "        }", mapsTo: null },
          { id: "p4_cpp_12", text: "        cout << endl;", mapsTo: "p4_py_7" },
          { id: "p4_cpp_13", text: "    }", mapsTo: null },
          { id: "p4_cpp_14", text: "    return 0;", mapsTo: null },
          { id: "p4_cpp_15", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p4_cpp_1", "p4_cpp_2", "p4_cpp_3", "p4_cpp_4", "p4_cpp_5", "p4_cpp_6", "p4_cpp_7", "p4_cpp_8", "p4_cpp_9", "p4_cpp_10", "p4_cpp_11", "p4_cpp_12", "p4_cpp_13", "p4_cpp_14", "p4_cpp_15"],
        indentationLevels: {
          "p4_cpp_1": 0,
          "p4_cpp_2": 0,
          "p4_cpp_3": 0,
          "p4_cpp_4": 1,
          "p4_cpp_5": 1,
          "p4_cpp_6": 2,
          "p4_cpp_7": 3,
          "p4_cpp_8": 2,
          "p4_cpp_9": 2,
          "p4_cpp_10": 3,
          "p4_cpp_11": 2,
          "p4_cpp_12": 2,
          "p4_cpp_13": 1,
          "p4_cpp_14": 1,
          "p4_cpp_15": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 05 (Pattern 7: Inverted Star Pyramid)
  // =========================================================================
  {
    id: 5,
    number: "05",
    title: "Inverted Star Pyramid",
    description: "Reconstruct leading spaces and diminishing star counts for an inverted pyramid.",
    output: [
      "* * * * *",
      " * * * *",
      "  * * *",
      "   * *",
      "    *"
    ],
    languages: {
      python: {
        lines: [
          { id: "p5_py_1", text: "n = 5", mapsTo: "p5_cpp_4" },
          { id: "p5_py_2", text: "for echo in range(1, n + 1):", mapsTo: "p5_cpp_5" },
          { id: "p5_py_3", text: "    for pixel in range(echo - 1):", mapsTo: "p5_cpp_6" },
          { id: "p5_py_4", text: "        print(\" \", end=\"\")", mapsTo: "p5_cpp_7" },
          { id: "p5_py_5", text: "    for pixel in range(n - echo + 1):", mapsTo: "p5_cpp_9" },
          { id: "p5_py_6", text: "        print(\"* \", end=\"\")", mapsTo: "p5_cpp_10" },
          { id: "p5_py_7", text: "    print()", mapsTo: "p5_cpp_12" }
        ],
        solutionOrder: ["p5_py_1", "p5_py_2", "p5_py_3", "p5_py_4", "p5_py_5", "p5_py_6", "p5_py_7"],
        indentationLevels: {
          "p5_py_1": 0,
          "p5_py_2": 0,
          "p5_py_3": 1,
          "p5_py_4": 2,
          "p5_py_5": 1,
          "p5_py_6": 2,
          "p5_py_7": 1
        }
      },
      cpp: {
        lines: [
          { id: "p5_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p5_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p5_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p5_cpp_4", text: "    int n = 5;", mapsTo: "p5_py_1" },
          { id: "p5_cpp_5", text: "    for (int echo = 1; echo <= n; echo++) {", mapsTo: "p5_py_2" },
          { id: "p5_cpp_6", text: "        for (int pixel = 1; pixel < echo; pixel++) {", mapsTo: "p5_py_3" },
          { id: "p5_cpp_7", text: "            cout << \" \";", mapsTo: "p5_py_4" },
          { id: "p5_cpp_8", text: "        }", mapsTo: null },
          { id: "p5_cpp_9", text: "        for (int pixel = 1; pixel <= n - echo + 1; pixel++) {", mapsTo: "p5_py_5" },
          { id: "p5_cpp_10", text: "            cout << \"* \";", mapsTo: "p5_py_6" },
          { id: "p5_cpp_11", text: "        }", mapsTo: null },
          { id: "p5_cpp_12", text: "        cout << endl;", mapsTo: "p5_py_7" },
          { id: "p5_cpp_13", text: "    }", mapsTo: null },
          { id: "p5_cpp_14", text: "    return 0;", mapsTo: null },
          { id: "p5_cpp_15", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p5_cpp_1", "p5_cpp_2", "p5_cpp_3", "p5_cpp_4", "p5_cpp_5", "p5_cpp_6", "p5_cpp_7", "p5_cpp_8", "p5_cpp_9", "p5_cpp_10", "p5_cpp_11", "p5_cpp_12", "p5_cpp_13", "p5_cpp_14", "p5_cpp_15"],
        indentationLevels: {
          "p5_cpp_1": 0,
          "p5_cpp_2": 0,
          "p5_cpp_3": 0,
          "p5_cpp_4": 1,
          "p5_cpp_5": 1,
          "p5_cpp_6": 2,
          "p5_cpp_7": 3,
          "p5_cpp_8": 2,
          "p5_cpp_9": 2,
          "p5_cpp_10": 3,
          "p5_cpp_11": 2,
          "p5_cpp_12": 2,
          "p5_cpp_13": 1,
          "p5_cpp_14": 1,
          "p5_cpp_15": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 06 (Pattern 8: Diamond Star Pattern)
  // =========================================================================
  {
    id: 6,
    number: "06",
    title: "Diamond Star Pattern",
    description: "Reconstruct top pyramid and inverted lower pyramid loops to form a diamond.",
    output: [
      "    *",
      "   * *",
      "  * * *",
      " * * * *",
      "* * * * *",
      " * * * *",
      "  * * *",
      "   * *",
      "    *"
    ],
    languages: {
      python: {
        lines: [
          { id: "p6_py_1", text: "n = 5", mapsTo: "p6_cpp_4" },
          { id: "p6_py_2", text: "for flux in range(1, n + 1):", mapsTo: "p6_cpp_5" },
          { id: "p6_py_3", text: "    for nova in range(n - flux):", mapsTo: "p6_cpp_6" },
          { id: "p6_py_4", text: "        print(\" \", end=\"\")", mapsTo: "p6_cpp_7" },
          { id: "p6_py_5", text: "    for nova in range(1, flux + 1):", mapsTo: "p6_cpp_9" },
          { id: "p6_py_6", text: "        print(\"* \", end=\"\")", mapsTo: "p6_cpp_10" },
          { id: "p6_py_7", text: "    print()", mapsTo: "p6_cpp_12" },
          { id: "p6_py_8", text: "for flux in range(n - 1, 0, -1):", mapsTo: "p6_cpp_14" },
          { id: "p6_py_9", text: "    for nova in range(n - flux):", mapsTo: "p6_cpp_15" },
          { id: "p6_py_10", text: "        print(\" \", end=\"\")", mapsTo: "p6_cpp_16" },
          { id: "p6_py_11", text: "    for nova in range(1, flux + 1):", mapsTo: "p6_cpp_18" },
          { id: "p6_py_12", text: "        print(\"* \", end=\"\")", mapsTo: "p6_cpp_19" },
          { id: "p6_py_13", text: "    print()", mapsTo: "p6_cpp_21" }
        ],
        solutionOrder: ["p6_py_1", "p6_py_2", "p6_py_3", "p6_py_4", "p6_py_5", "p6_py_6", "p6_py_7", "p6_py_8", "p6_py_9", "p6_py_10", "p6_py_11", "p6_py_12", "p6_py_13"],
        indentationLevels: {
          "p6_py_1": 0,
          "p6_py_2": 0,
          "p6_py_3": 1,
          "p6_py_4": 2,
          "p6_py_5": 1,
          "p6_py_6": 2,
          "p6_py_7": 1,
          "p6_py_8": 0,
          "p6_py_9": 1,
          "p6_py_10": 2,
          "p6_py_11": 1,
          "p6_py_12": 2,
          "p6_py_13": 1
        }
      },
      cpp: {
        lines: [
          { id: "p6_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p6_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p6_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p6_cpp_4", text: "    int n = 5;", mapsTo: "p6_py_1" },
          { id: "p6_cpp_5", text: "    for (int flux = 1; flux <= n; flux++) {", mapsTo: "p6_py_2" },
          { id: "p6_cpp_6", text: "        for (int nova = 1; nova <= n - flux; nova++) {", mapsTo: "p6_py_3" },
          { id: "p6_cpp_7", text: "            cout << \" \";", mapsTo: "p6_py_4" },
          { id: "p6_cpp_8", text: "        }", mapsTo: null },
          { id: "p6_cpp_9", text: "        for (int nova = 1; nova <= flux; nova++) {", mapsTo: "p6_py_5" },
          { id: "p6_cpp_10", text: "            cout << \"* \";", mapsTo: "p6_py_6" },
          { id: "p6_cpp_11", text: "        }", mapsTo: null },
          { id: "p6_cpp_12", text: "        cout << endl;", mapsTo: "p6_py_7" },
          { id: "p6_cpp_13", text: "    }", mapsTo: null },
          { id: "p6_cpp_14", text: "    for (int flux = n - 1; flux >= 1; flux--) {", mapsTo: "p6_py_8" },
          { id: "p6_cpp_15", text: "        for (int nova = 1; nova <= n - flux; nova++) {", mapsTo: "p6_py_9" },
          { id: "p6_cpp_16", text: "            cout << \" \";", mapsTo: "p6_py_10" },
          { id: "p6_cpp_17", text: "        }", mapsTo: null },
          { id: "p6_cpp_18", text: "        for (int nova = 1; nova <= flux; nova++) {", mapsTo: "p6_py_11" },
          { id: "p6_cpp_19", text: "            cout << \"* \";", mapsTo: "p6_py_12" },
          { id: "p6_cpp_20", text: "        }", mapsTo: null },
          { id: "p6_cpp_21", text: "        cout << endl;", mapsTo: "p6_py_13" },
          { id: "p6_cpp_22", text: "    }", mapsTo: null },
          { id: "p6_cpp_23", text: "    return 0;", mapsTo: null },
          { id: "p6_cpp_24", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p6_cpp_1", "p6_cpp_2", "p6_cpp_3", "p6_cpp_4", "p6_cpp_5", "p6_cpp_6", "p6_cpp_7", "p6_cpp_8", "p6_cpp_9", "p6_cpp_10", "p6_cpp_11", "p6_cpp_12", "p6_cpp_13", "p6_cpp_14", "p6_cpp_15", "p6_cpp_16", "p6_cpp_17", "p6_cpp_18", "p6_cpp_19", "p6_cpp_20", "p6_cpp_21", "p6_cpp_22", "p6_cpp_23", "p6_cpp_24"],
        indentationLevels: {
          "p6_cpp_1": 0, "p6_cpp_2": 0, "p6_cpp_3": 0, "p6_cpp_4": 1,
          "p6_cpp_5": 1, "p6_cpp_6": 2, "p6_cpp_7": 3, "p6_cpp_8": 2,
          "p6_cpp_9": 2, "p6_cpp_10": 3, "p6_cpp_11": 2, "p6_cpp_12": 2, "p6_cpp_13": 1,
          "p6_cpp_14": 1, "p6_cpp_15": 2, "p6_cpp_16": 3, "p6_cpp_17": 2,
          "p6_cpp_18": 2, "p6_cpp_19": 3, "p6_cpp_20": 2, "p6_cpp_21": 2, "p6_cpp_22": 1,
          "p6_cpp_23": 1, "p6_cpp_24": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 07 (Pattern 10: Hollow Increasing Star Triangle)
  // =========================================================================
  {
    id: 7,
    number: "07",
    title: "Hollow Increasing Star Triangle",
    description: "Reconstruct boundary logic (echo == 1 or echo == orbit or orbit == n) to print a hollow triangle.",
    output: [
      "*",
      "* *",
      "*   *",
      "*     *",
      "* * * * *"
    ],
    languages: {
      python: {
        lines: [
          { id: "p7_py_1", text: "n = 5", mapsTo: "p7_cpp_4" },
          { id: "p7_py_2", text: "for orbit in range(1, n + 1):", mapsTo: "p7_cpp_5" },
          { id: "p7_py_3", text: "    for echo in range(1, orbit + 1):", mapsTo: "p7_cpp_6" },
          { id: "p7_py_4", text: "        if echo == 1 or echo == orbit or orbit == n:", mapsTo: "p7_cpp_7" },
          { id: "p7_py_5", text: "            print(\"*\", end=\" \")", mapsTo: "p7_cpp_8" },
          { id: "p7_py_6", text: "        else:", mapsTo: "p7_cpp_9" },
          { id: "p7_py_7", text: "            print(\" \", end=\" \")", mapsTo: "p7_cpp_10" },
          { id: "p7_py_8", text: "    print()", mapsTo: "p7_cpp_13" }
        ],
        solutionOrder: ["p7_py_1", "p7_py_2", "p7_py_3", "p7_py_4", "p7_py_5", "p7_py_6", "p7_py_7", "p7_py_8"],
        indentationLevels: {
          "p7_py_1": 0,
          "p7_py_2": 0,
          "p7_py_3": 1,
          "p7_py_4": 2,
          "p7_py_5": 3,
          "p7_py_6": 2,
          "p7_py_7": 3,
          "p7_py_8": 1
        }
      },
      cpp: {
        lines: [
          { id: "p7_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p7_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p7_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p7_cpp_4", text: "    int n = 5;", mapsTo: "p7_py_1" },
          { id: "p7_cpp_5", text: "    for (int orbit = 1; orbit <= n; orbit++) {", mapsTo: "p7_py_2" },
          { id: "p7_cpp_6", text: "        for (int echo = 1; echo <= orbit; echo++) {", mapsTo: "p7_py_3" },
          { id: "p7_cpp_7", text: "            if (echo == 1 || echo == orbit || orbit == n) {", mapsTo: "p7_py_4" },
          { id: "p7_cpp_8", text: "                cout << \"* \";", mapsTo: "p7_py_5" },
          { id: "p7_cpp_9", text: "            } else {", mapsTo: "p7_py_6" },
          { id: "p7_cpp_10", text: "                cout << \"  \";", mapsTo: "p7_py_7" },
          { id: "p7_cpp_11", text: "            }", mapsTo: null },
          { id: "p7_cpp_12", text: "        }", mapsTo: null },
          { id: "p7_cpp_13", text: "        cout << endl;", mapsTo: "p7_py_8" },
          { id: "p7_cpp_14", text: "    }", mapsTo: null },
          { id: "p7_cpp_15", text: "    return 0;", mapsTo: null },
          { id: "p7_cpp_16", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p7_cpp_1", "p7_cpp_2", "p7_cpp_3", "p7_cpp_4", "p7_cpp_5", "p7_cpp_6", "p7_cpp_7", "p7_cpp_8", "p7_cpp_9", "p7_cpp_10", "p7_cpp_11", "p7_cpp_12", "p7_cpp_13", "p7_cpp_14", "p7_cpp_15", "p7_cpp_16"],
        indentationLevels: {
          "p7_cpp_1": 0, "p7_cpp_2": 0, "p7_cpp_3": 0, "p7_cpp_4": 1,
          "p7_cpp_5": 1, "p7_cpp_6": 2, "p7_cpp_7": 3, "p7_cpp_8": 4,
          "p7_cpp_9": 3, "p7_cpp_10": 4, "p7_cpp_11": 3, "p7_cpp_12": 2,
          "p7_cpp_13": 2, "p7_cpp_14": 1, "p7_cpp_15": 1, "p7_cpp_16": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 08 (Pattern 11: X Pattern)
  // =========================================================================
  {
    id: 8,
    number: "08",
    title: "X Pattern",
    description: "Reconstruct diagonal condition (pixel == flux or pixel + flux == n - 1) to form an X shape.",
    output: [
      "*       *",
      "  *   *",
      "    *",
      "  *   *",
      "*       *"
    ],
    languages: {
      python: {
        lines: [
          { id: "p8_py_1", text: "n = 5", mapsTo: "p8_cpp_4" },
          { id: "p8_py_2", text: "for pixel in range(n):", mapsTo: "p8_cpp_5" },
          { id: "p8_py_3", text: "    for flux in range(n):", mapsTo: "p8_cpp_6" },
          { id: "p8_py_4", text: "        if pixel == flux or pixel + flux == n - 1:", mapsTo: "p8_cpp_7" },
          { id: "p8_py_5", text: "            print(\"*\", end=\" \")", mapsTo: "p8_cpp_8" },
          { id: "p8_py_6", text: "        else:", mapsTo: "p8_cpp_9" },
          { id: "p8_py_7", text: "            print(\" \", end=\" \")", mapsTo: "p8_cpp_10" },
          { id: "p8_py_8", text: "    print()", mapsTo: "p8_cpp_13" }
        ],
        solutionOrder: ["p8_py_1", "p8_py_2", "p8_py_3", "p8_py_4", "p8_py_5", "p8_py_6", "p8_py_7", "p8_py_8"],
        indentationLevels: {
          "p8_py_1": 0,
          "p8_py_2": 0,
          "p8_py_3": 1,
          "p8_py_4": 2,
          "p8_py_5": 3,
          "p8_py_6": 2,
          "p8_py_7": 3,
          "p8_py_8": 1
        }
      },
      cpp: {
        lines: [
          { id: "p8_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p8_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p8_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p8_cpp_4", text: "    int n = 5;", mapsTo: "p8_py_1" },
          { id: "p8_cpp_5", text: "    for (int pixel = 0; pixel < n; pixel++) {", mapsTo: "p8_py_2" },
          { id: "p8_cpp_6", text: "        for (int flux = 0; flux < n; flux++) {", mapsTo: "p8_py_3" },
          { id: "p8_cpp_7", text: "            if (pixel == flux || pixel + flux == n - 1) {", mapsTo: "p8_py_4" },
          { id: "p8_cpp_8", text: "                cout << \"* \";", mapsTo: "p8_py_5" },
          { id: "p8_cpp_9", text: "            } else {", mapsTo: "p8_py_6" },
          { id: "p8_cpp_10", text: "                cout << \"  \";", mapsTo: "p8_py_7" },
          { id: "p8_cpp_11", text: "            }", mapsTo: null },
          { id: "p8_cpp_12", text: "        }", mapsTo: null },
          { id: "p8_cpp_13", text: "        cout << endl;", mapsTo: "p8_py_8" },
          { id: "p8_cpp_14", text: "    }", mapsTo: null },
          { id: "p8_cpp_15", text: "    return 0;", mapsTo: null },
          { id: "p8_cpp_16", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p8_cpp_1", "p8_cpp_2", "p8_cpp_3", "p8_cpp_4", "p8_cpp_5", "p8_cpp_6", "p8_cpp_7", "p8_cpp_8", "p8_cpp_9", "p8_cpp_10", "p8_cpp_11", "p8_cpp_12", "p8_cpp_13", "p8_cpp_14", "p8_cpp_15", "p8_cpp_16"],
        indentationLevels: {
          "p8_cpp_1": 0, "p8_cpp_2": 0, "p8_cpp_3": 0, "p8_cpp_4": 1,
          "p8_cpp_5": 1, "p8_cpp_6": 2, "p8_cpp_7": 3, "p8_cpp_8": 4,
          "p8_cpp_9": 3, "p8_cpp_10": 4, "p8_cpp_11": 3, "p8_cpp_12": 2,
          "p8_cpp_13": 2, "p8_cpp_14": 1, "p8_cpp_15": 1, "p8_cpp_16": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 09 (Pattern 16: Decreasing Number Triangle)
  // =========================================================================
  {
    id: 9,
    number: "09",
    title: "Decreasing Number Triangle",
    description: "Reconstruct loops that print numbers 1 through nova across diminishing rows.",
    output: [
      "1 2 3 4 5",
      "1 2 3 4",
      "1 2 3",
      "1 2",
      "1"
    ],
    languages: {
      python: {
        lines: [
          { id: "p9_py_1", text: "n = 5", mapsTo: "p9_cpp_4" },
          { id: "p9_py_2", text: "for nova in range(n, 0, -1):", mapsTo: "p9_cpp_5" },
          { id: "p9_py_3", text: "    for orbit in range(1, nova + 1):", mapsTo: "p9_cpp_6" },
          { id: "p9_py_4", text: "        print(orbit, end=\" \")", mapsTo: "p9_cpp_7" },
          { id: "p9_py_5", text: "    print()", mapsTo: "p9_cpp_9" }
        ],
        solutionOrder: ["p9_py_1", "p9_py_2", "p9_py_3", "p9_py_4", "p9_py_5"],
        indentationLevels: {
          "p9_py_1": 0,
          "p9_py_2": 0,
          "p9_py_3": 1,
          "p9_py_4": 2,
          "p9_py_5": 1
        }
      },
      cpp: {
        lines: [
          { id: "p9_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p9_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p9_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p9_cpp_4", text: "    int n = 5;", mapsTo: "p9_py_1" },
          { id: "p9_cpp_5", text: "    for (int nova = n; nova >= 1; nova--) {", mapsTo: "p9_py_2" },
          { id: "p9_cpp_6", text: "        for (int orbit = 1; orbit <= nova; orbit++) {", mapsTo: "p9_py_3" },
          { id: "p9_cpp_7", text: "            cout << orbit << \" \";", mapsTo: "p9_py_4" },
          { id: "p9_cpp_8", text: "        }", mapsTo: null },
          { id: "p9_cpp_9", text: "        cout << endl;", mapsTo: "p9_py_5" },
          { id: "p9_cpp_10", text: "    }", mapsTo: null },
          { id: "p9_cpp_11", text: "    return 0;", mapsTo: null },
          { id: "p9_cpp_12", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p9_cpp_1", "p9_cpp_2", "p9_cpp_3", "p9_cpp_4", "p9_cpp_5", "p9_cpp_6", "p9_cpp_7", "p9_cpp_8", "p9_cpp_9", "p9_cpp_10", "p9_cpp_11", "p9_cpp_12"],
        indentationLevels: {
          "p9_cpp_1": 0, "p9_cpp_2": 0, "p9_cpp_3": 0, "p9_cpp_4": 1,
          "p9_cpp_5": 1, "p9_cpp_6": 2, "p9_cpp_7": 3, "p9_cpp_8": 2,
          "p9_cpp_9": 2, "p9_cpp_10": 1, "p9_cpp_11": 1, "p9_cpp_12": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 10 (Pattern 17: Reverse Counting Triangle)
  // =========================================================================
  {
    id: 10,
    number: "10",
    title: "Reverse Counting Triangle",
    description: "Reconstruct countdown sequences decreasing from n on each row.",
    output: [
      "5 4 3 2 1",
      "5 4 3 2",
      "5 4 3",
      "5 4",
      "5"
    ],
    languages: {
      python: {
        lines: [
          { id: "p10_py_1", text: "n = 5", mapsTo: "p10_cpp_4" },
          { id: "p10_py_2", text: "for echo in range(n, 0, -1):", mapsTo: "p10_cpp_5" },
          { id: "p10_py_3", text: "    for pixel in range(n, n - echo, -1):", mapsTo: "p10_cpp_6" },
          { id: "p10_py_4", text: "        print(pixel, end=\" \")", mapsTo: "p10_cpp_7" },
          { id: "p10_py_5", text: "    print()", mapsTo: "p10_cpp_9" }
        ],
        solutionOrder: ["p10_py_1", "p10_py_2", "p10_py_3", "p10_py_4", "p10_py_5"],
        indentationLevels: {
          "p10_py_1": 0,
          "p10_py_2": 0,
          "p10_py_3": 1,
          "p10_py_4": 2,
          "p10_py_5": 1
        }
      },
      cpp: {
        lines: [
          { id: "p10_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p10_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p10_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p10_cpp_4", text: "    int n = 5;", mapsTo: "p10_py_1" },
          { id: "p10_cpp_5", text: "    for (int echo = n; echo >= 1; echo--) {", mapsTo: "p10_py_2" },
          { id: "p10_cpp_6", text: "        for (int pixel = n; pixel > n - echo; pixel--) {", mapsTo: "p10_py_3" },
          { id: "p10_cpp_7", text: "            cout << pixel << \" \";", mapsTo: "p10_py_4" },
          { id: "p10_cpp_8", text: "        }", mapsTo: null },
          { id: "p10_cpp_9", text: "        cout << endl;", mapsTo: "p10_py_5" },
          { id: "p10_cpp_10", text: "    }", mapsTo: null },
          { id: "p10_cpp_11", text: "    return 0;", mapsTo: null },
          { id: "p10_cpp_12", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p10_cpp_1", "p10_cpp_2", "p10_cpp_3", "p10_cpp_4", "p10_cpp_5", "p10_cpp_6", "p10_cpp_7", "p10_cpp_8", "p10_cpp_9", "p10_cpp_10", "p10_cpp_11", "p10_cpp_12"],
        indentationLevels: {
          "p10_cpp_1": 0, "p10_cpp_2": 0, "p10_cpp_3": 0, "p10_cpp_4": 1,
          "p10_cpp_5": 1, "p10_cpp_6": 2, "p10_cpp_7": 3, "p10_cpp_8": 2,
          "p10_cpp_9": 2, "p10_cpp_10": 1, "p10_cpp_11": 1, "p10_cpp_12": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 11 (Pattern 18: Continuous Counting Triangle / Floyd's Triangle)
  // =========================================================================
  {
    id: 11,
    number: "11",
    title: "Continuous Counting Triangle (Floyd's Triangle)",
    description: "Reconstruct a continuous incrementing counter across increasing rows.",
    output: [
      "1",
      "2 3",
      "4 5 6",
      "7 8 9 10",
      "11 12 13 14 15"
    ],
    languages: {
      python: {
        lines: [
          { id: "p11_py_1", text: "n = 5", mapsTo: "p11_cpp_4" },
          { id: "p11_py_2", text: "number = 1", mapsTo: "p11_cpp_5" },
          { id: "p11_py_3", text: "for flux in range(1, n + 1):", mapsTo: "p11_cpp_6" },
          { id: "p11_py_4", text: "    for nova in range(1, flux + 1):", mapsTo: "p11_cpp_7" },
          { id: "p11_py_5", text: "        print(number, end=\" \")", mapsTo: "p11_cpp_8" },
          { id: "p11_py_6", text: "        number += 1", mapsTo: "p11_cpp_9" },
          { id: "p11_py_7", text: "    print()", mapsTo: "p11_cpp_11" }
        ],
        solutionOrder: ["p11_py_1", "p11_py_2", "p11_py_3", "p11_py_4", "p11_py_5", "p11_py_6", "p11_py_7"],
        indentationLevels: {
          "p11_py_1": 0,
          "p11_py_2": 0,
          "p11_py_3": 0,
          "p11_py_4": 1,
          "p11_py_5": 2,
          "p11_py_6": 2,
          "p11_py_7": 1
        }
      },
      cpp: {
        lines: [
          { id: "p11_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p11_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p11_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p11_cpp_4", text: "    int n = 5;", mapsTo: "p11_py_1" },
          { id: "p11_cpp_5", text: "    int number = 1;", mapsTo: "p11_py_2" },
          { id: "p11_cpp_6", text: "    for (int flux = 1; flux <= n; flux++) {", mapsTo: "p11_py_3" },
          { id: "p11_cpp_7", text: "        for (int nova = 1; nova <= flux; nova++) {", mapsTo: "p11_py_4" },
          { id: "p11_cpp_8", text: "            cout << number << \" \";", mapsTo: "p11_py_5" },
          { id: "p11_cpp_9", text: "            number++;", mapsTo: "p11_py_6" },
          { id: "p11_cpp_10", text: "        }", mapsTo: null },
          { id: "p11_cpp_11", text: "        cout << endl;", mapsTo: "p11_py_7" },
          { id: "p11_cpp_12", text: "    }", mapsTo: null },
          { id: "p11_cpp_13", text: "    return 0;", mapsTo: null },
          { id: "p11_cpp_14", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p11_cpp_1", "p11_cpp_2", "p11_cpp_3", "p11_cpp_4", "p11_cpp_5", "p11_cpp_6", "p11_cpp_7", "p11_cpp_8", "p11_cpp_9", "p11_cpp_10", "p11_cpp_11", "p11_cpp_12", "p11_cpp_13", "p11_cpp_14"],
        indentationLevels: {
          "p11_cpp_1": 0, "p11_cpp_2": 0, "p11_cpp_3": 0, "p11_cpp_4": 1,
          "p11_cpp_5": 1, "p11_cpp_6": 1, "p11_cpp_7": 2, "p11_cpp_8": 3,
          "p11_cpp_9": 3, "p11_cpp_10": 2, "p11_cpp_11": 2, "p11_cpp_12": 1,
          "p11_cpp_13": 1, "p11_cpp_14": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 12 (Pattern 20: Number Pyramid)
  // =========================================================================
  {
    id: 12,
    number: "12",
    title: "Number Pyramid",
    description: "Reconstruct spaces and ascending numbers 1 through echo in a pyramid shape.",
    output: [
      "    1",
      "   1 2",
      "  1 2 3",
      " 1 2 3 4",
      "1 2 3 4 5"
    ],
    languages: {
      python: {
        lines: [
          { id: "p12_py_1", text: "n = 5", mapsTo: "p12_cpp_4" },
          { id: "p12_py_2", text: "for orbit in range(1, n + 1):", mapsTo: "p12_cpp_5" },
          { id: "p12_py_3", text: "    for echo in range(n - orbit):", mapsTo: "p12_cpp_6" },
          { id: "p12_py_4", text: "        print(\" \", end=\"\")", mapsTo: "p12_cpp_7" },
          { id: "p12_py_5", text: "    for echo in range(1, orbit + 1):", mapsTo: "p12_cpp_9" },
          { id: "p12_py_6", text: "        print(echo, end=\" \")", mapsTo: "p12_cpp_10" },
          { id: "p12_py_7", text: "    print()", mapsTo: "p12_cpp_12" }
        ],
        solutionOrder: ["p12_py_1", "p12_py_2", "p12_py_3", "p12_py_4", "p12_py_5", "p12_py_6", "p12_py_7"],
        indentationLevels: {
          "p12_py_1": 0,
          "p12_py_2": 0,
          "p12_py_3": 1,
          "p12_py_4": 2,
          "p12_py_5": 1,
          "p12_py_6": 2,
          "p12_py_7": 1
        }
      },
      cpp: {
        lines: [
          { id: "p12_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p12_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p12_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p12_cpp_4", text: "    int n = 5;", mapsTo: "p12_py_1" },
          { id: "p12_cpp_5", text: "    for (int orbit = 1; orbit <= n; orbit++) {", mapsTo: "p12_py_2" },
          { id: "p12_cpp_6", text: "        for (int echo = 1; echo <= n - orbit; echo++) {", mapsTo: "p12_py_3" },
          { id: "p12_cpp_7", text: "            cout << \" \";", mapsTo: "p12_py_4" },
          { id: "p12_cpp_8", text: "        }", mapsTo: null },
          { id: "p12_cpp_9", text: "        for (int echo = 1; echo <= orbit; echo++) {", mapsTo: "p12_py_5" },
          { id: "p12_cpp_10", text: "            cout << echo << \" \";", mapsTo: "p12_py_6" },
          { id: "p12_cpp_11", text: "        }", mapsTo: null },
          { id: "p12_cpp_12", text: "        cout << endl;", mapsTo: "p12_py_7" },
          { id: "p12_cpp_13", text: "    }", mapsTo: null },
          { id: "p12_cpp_14", text: "    return 0;", mapsTo: null },
          { id: "p12_cpp_15", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p12_cpp_1", "p12_cpp_2", "p12_cpp_3", "p12_cpp_4", "p12_cpp_5", "p12_cpp_6", "p12_cpp_7", "p12_cpp_8", "p12_cpp_9", "p12_cpp_10", "p12_cpp_11", "p12_cpp_12", "p12_cpp_13", "p12_cpp_14", "p12_cpp_15"],
        indentationLevels: {
          "p12_cpp_1": 0, "p12_cpp_2": 0, "p12_cpp_3": 0, "p12_cpp_4": 1,
          "p12_cpp_5": 1, "p12_cpp_6": 2, "p12_cpp_7": 3, "p12_cpp_8": 2,
          "p12_cpp_9": 2, "p12_cpp_10": 3, "p12_cpp_11": 2, "p12_cpp_12": 2,
          "p12_cpp_13": 1, "p12_cpp_14": 1, "p12_cpp_15": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 13 (Pattern 21: Repeated Row Number Pyramid)
  // =========================================================================
  {
    id: 13,
    number: "13",
    title: "Repeated Row Number Pyramid",
    description: "Reconstruct loops that repeat the row number pixel within a centered pyramid.",
    output: [
      "    1",
      "   2 2",
      "  3 3 3",
      " 4 4 4 4",
      "5 5 5 5 5"
    ],
    languages: {
      python: {
        lines: [
          { id: "p13_py_1", text: "n = 5", mapsTo: "p13_cpp_4" },
          { id: "p13_py_2", text: "for pixel in range(1, n + 1):", mapsTo: "p13_cpp_5" },
          { id: "p13_py_3", text: "    for flux in range(n - pixel):", mapsTo: "p13_cpp_6" },
          { id: "p13_py_4", text: "        print(\" \", end=\"\")", mapsTo: "p13_cpp_7" },
          { id: "p13_py_5", text: "    for flux in range(1, pixel + 1):", mapsTo: "p13_cpp_9" },
          { id: "p13_py_6", text: "        print(pixel, end=\" \")", mapsTo: "p13_cpp_10" },
          { id: "p13_py_7", text: "    print()", mapsTo: "p13_cpp_12" }
        ],
        solutionOrder: ["p13_py_1", "p13_py_2", "p13_py_3", "p13_py_4", "p13_py_5", "p13_py_6", "p13_py_7"],
        indentationLevels: {
          "p13_py_1": 0,
          "p13_py_2": 0,
          "p13_py_3": 1,
          "p13_py_4": 2,
          "p13_py_5": 1,
          "p13_py_6": 2,
          "p13_py_7": 1
        }
      },
      cpp: {
        lines: [
          { id: "p13_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p13_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p13_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p13_cpp_4", text: "    int n = 5;", mapsTo: "p13_py_1" },
          { id: "p13_cpp_5", text: "    for (int pixel = 1; pixel <= n; pixel++) {", mapsTo: "p13_py_2" },
          { id: "p13_cpp_6", text: "        for (int flux = 1; flux <= n - pixel; flux++) {", mapsTo: "p13_py_3" },
          { id: "p13_cpp_7", text: "            cout << \" \";", mapsTo: "p13_py_4" },
          { id: "p13_cpp_8", text: "        }", mapsTo: null },
          { id: "p13_cpp_9", text: "        for (int flux = 1; flux <= pixel; flux++) {", mapsTo: "p13_py_5" },
          { id: "p13_cpp_10", text: "            cout << pixel << \" \";", mapsTo: "p13_py_6" },
          { id: "p13_cpp_11", text: "        }", mapsTo: null },
          { id: "p13_cpp_12", text: "        cout << endl;", mapsTo: "p13_py_7" },
          { id: "p13_cpp_13", text: "    }", mapsTo: null },
          { id: "p13_cpp_14", text: "    return 0;", mapsTo: null },
          { id: "p13_cpp_15", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p13_cpp_1", "p13_cpp_2", "p13_cpp_3", "p13_cpp_4", "p13_cpp_5", "p13_cpp_6", "p13_cpp_7", "p13_cpp_8", "p13_cpp_9", "p13_cpp_10", "p13_cpp_11", "p13_cpp_12", "p13_cpp_13", "p13_cpp_14", "p13_cpp_15"],
        indentationLevels: {
          "p13_cpp_1": 0, "p13_cpp_2": 0, "p13_cpp_3": 0, "p13_cpp_4": 1,
          "p13_cpp_5": 1, "p13_cpp_6": 2, "p13_cpp_7": 3, "p13_cpp_8": 2,
          "p13_cpp_9": 2, "p13_cpp_10": 3, "p13_cpp_11": 2, "p13_cpp_12": 2,
          "p13_cpp_13": 1, "p13_cpp_14": 1, "p13_cpp_15": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 14 (Pattern 13: Alternating Star Rows)
  // =========================================================================
  {
    id: 14,
    number: "14",
    title: "Alternating Star Rows",
    description: "Reconstruct parity check (nova % 2 == 0) to alternate indentations and star counts.",
    output: [
      "* * * * *",
      "  * * * *",
      "* * * * *",
      "  * * * *",
      "* * * * *"
    ],
    languages: {
      python: {
        lines: [
          { id: "p14_py_1", text: "n = 5", mapsTo: "p14_cpp_4" },
          { id: "p14_py_2", text: "for nova in range(1, n + 1):", mapsTo: "p14_cpp_5" },
          { id: "p14_py_3", text: "    if nova % 2 == 0:", mapsTo: "p14_cpp_7" },
          { id: "p14_py_4", text: "        print(\"  \", end=\"\")", mapsTo: "p14_cpp_8" },
          { id: "p14_py_5", text: "        star_count = n - 1", mapsTo: "p14_cpp_9" },
          { id: "p14_py_6", text: "    else:", mapsTo: "p14_cpp_10" },
          { id: "p14_py_7", text: "        star_count = n", mapsTo: "p14_cpp_11" },
          { id: "p14_py_8", text: "    for orbit in range(1, n + 1):", mapsTo: "p14_cpp_13" },
          { id: "p14_py_9", text: "        if orbit <= star_count:", mapsTo: "p14_cpp_14" },
          { id: "p14_py_10", text: "            print(\"* \", end=\"\")", mapsTo: "p14_cpp_15" },
          { id: "p14_py_11", text: "    print()", mapsTo: "p14_cpp_18" }
        ],
        solutionOrder: ["p14_py_1", "p14_py_2", "p14_py_3", "p14_py_4", "p14_py_5", "p14_py_6", "p14_py_7", "p14_py_8", "p14_py_9", "p14_py_10", "p14_py_11"],
        indentationLevels: {
          "p14_py_1": 0,
          "p14_py_2": 0,
          "p14_py_3": 1,
          "p14_py_4": 2,
          "p14_py_5": 2,
          "p14_py_6": 1,
          "p14_py_7": 2,
          "p14_py_8": 1,
          "p14_py_9": 2,
          "p14_py_10": 3,
          "p14_py_11": 1
        }
      },
      cpp: {
        lines: [
          { id: "p14_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p14_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p14_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p14_cpp_4", text: "    int n = 5;", mapsTo: "p14_py_1" },
          { id: "p14_cpp_5", text: "    for (int nova = 1; nova <= n; nova++) {", mapsTo: "p14_py_2" },
          { id: "p14_cpp_6", text: "        int star_count;", mapsTo: null },
          { id: "p14_cpp_7", text: "        if (nova % 2 == 0) {", mapsTo: "p14_py_3" },
          { id: "p14_cpp_8", text: "            cout << \"  \";", mapsTo: "p14_py_4" },
          { id: "p14_cpp_9", text: "            star_count = n - 1;", mapsTo: "p14_py_5" },
          { id: "p14_cpp_10", text: "        } else {", mapsTo: "p14_py_6" },
          { id: "p14_cpp_11", text: "            star_count = n;", mapsTo: "p14_py_7" },
          { id: "p14_cpp_12", text: "        }", mapsTo: null },
          { id: "p14_cpp_13", text: "        for (int orbit = 1; orbit <= n; orbit++) {", mapsTo: "p14_py_8" },
          { id: "p14_cpp_14", text: "            if (orbit <= star_count) {", mapsTo: "p14_py_9" },
          { id: "p14_cpp_15", text: "                cout << \"* \";", mapsTo: "p14_py_10" },
          { id: "p14_cpp_16", text: "            }", mapsTo: null },
          { id: "p14_cpp_17", text: "        }", mapsTo: null },
          { id: "p14_cpp_18", text: "        cout << endl;", mapsTo: "p14_py_11" },
          { id: "p14_cpp_19", text: "    }", mapsTo: null },
          { id: "p14_cpp_20", text: "    return 0;", mapsTo: null },
          { id: "p14_cpp_21", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p14_cpp_1", "p14_cpp_2", "p14_cpp_3", "p14_cpp_4", "p14_cpp_5", "p14_cpp_6", "p14_cpp_7", "p14_cpp_8", "p14_cpp_9", "p14_cpp_10", "p14_cpp_11", "p14_cpp_12", "p14_cpp_13", "p14_cpp_14", "p14_cpp_15", "p14_cpp_16", "p14_cpp_17", "p14_cpp_18", "p14_cpp_19", "p14_cpp_20", "p14_cpp_21"],
        indentationLevels: {
          "p14_cpp_1": 0, "p14_cpp_2": 0, "p14_cpp_3": 0, "p14_cpp_4": 1,
          "p14_cpp_5": 1, "p14_cpp_6": 2, "p14_cpp_7": 2, "p14_cpp_8": 3,
          "p14_cpp_9": 3, "p14_cpp_10": 2, "p14_cpp_11": 3, "p14_cpp_12": 2,
          "p14_cpp_13": 2, "p14_cpp_14": 3, "p14_cpp_15": 4, "p14_cpp_16": 3,
          "p14_cpp_17": 2, "p14_cpp_18": 2, "p14_cpp_19": 1, "p14_cpp_20": 1,
          "p14_cpp_21": 0
        }
      }
    }
  },

  // =========================================================================
  // CHALLENGE 15 (Pattern 19: Repeated Digit Triangle)
  // =========================================================================
  {
    id: 15,
    number: "15",
    title: "Repeated Digit Triangle",
    description: "Reconstruct loops that repeat each row digit to match the row length without inner spaces.",
    output: [
      "1",
      "22",
      "333",
      "4444",
      "55555"
    ],
    languages: {
      python: {
        lines: [
          { id: "p15_py_1", text: "n = 5", mapsTo: "p15_cpp_4" },
          { id: "p15_py_2", text: "for echo in range(1, n + 1):", mapsTo: "p15_cpp_5" },
          { id: "p15_py_3", text: "    for pixel in range(1, n + 1):", mapsTo: "p15_cpp_6" },
          { id: "p15_py_4", text: "        if pixel <= echo:", mapsTo: "p15_cpp_7" },
          { id: "p15_py_5", text: "            print(echo, end=\"\")", mapsTo: "p15_cpp_8" },
          { id: "p15_py_6", text: "    print()", mapsTo: "p15_cpp_11" }
        ],
        solutionOrder: ["p15_py_1", "p15_py_2", "p15_py_3", "p15_py_4", "p15_py_5", "p15_py_6"],
        indentationLevels: {
          "p15_py_1": 0,
          "p15_py_2": 0,
          "p15_py_3": 1,
          "p15_py_4": 2,
          "p15_py_5": 3,
          "p15_py_6": 1
        }
      },
      cpp: {
        lines: [
          { id: "p15_cpp_1", text: "#include <iostream>", mapsTo: null },
          { id: "p15_cpp_2", text: "using namespace std;", mapsTo: null },
          { id: "p15_cpp_3", text: "int main() {", mapsTo: null },
          { id: "p15_cpp_4", text: "    int n = 5;", mapsTo: "p15_py_1" },
          { id: "p15_cpp_5", text: "    for (int echo = 1; echo <= n; echo++) {", mapsTo: "p15_py_2" },
          { id: "p15_cpp_6", text: "        for (int pixel = 1; pixel <= n; pixel++) {", mapsTo: "p15_py_3" },
          { id: "p15_cpp_7", text: "            if (pixel <= echo) {", mapsTo: "p15_py_4" },
          { id: "p15_cpp_8", text: "                cout << echo;", mapsTo: "p15_py_5" },
          { id: "p15_cpp_9", text: "            }", mapsTo: null },
          { id: "p15_cpp_10", text: "        }", mapsTo: null },
          { id: "p15_cpp_11", text: "        cout << endl;", mapsTo: "p15_py_6" },
          { id: "p15_cpp_12", text: "    }", mapsTo: null },
          { id: "p15_cpp_13", text: "    return 0;", mapsTo: null },
          { id: "p15_cpp_14", text: "}", mapsTo: null }
        ],
        solutionOrder: ["p15_cpp_1", "p15_cpp_2", "p15_cpp_3", "p15_cpp_4", "p15_cpp_5", "p15_cpp_6", "p15_cpp_7", "p15_cpp_8", "p15_cpp_9", "p15_cpp_10", "p15_cpp_11", "p15_cpp_12", "p15_cpp_13", "p15_cpp_14"],
        indentationLevels: {
          "p15_cpp_1": 0, "p15_cpp_2": 0, "p15_cpp_3": 0, "p15_cpp_4": 1,
          "p15_cpp_5": 1, "p15_cpp_6": 2, "p15_cpp_7": 3, "p15_cpp_8": 4,
          "p15_cpp_9": 3, "p15_cpp_10": 2, "p15_cpp_11": 2, "p15_cpp_12": 1,
          "p15_cpp_13": 1, "p15_cpp_14": 0
        }
      }
    }
  }
];

// Helper export / global attachment
if (typeof module !== "undefined" && module.exports) {
  module.exports = PATTERNS_DATA;
} else {
  window.PATTERNS_DATA = PATTERNS_DATA;
}

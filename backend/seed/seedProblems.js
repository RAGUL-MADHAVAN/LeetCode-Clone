const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Problem = require('../models/Problem');

const problems = [
    {
        title: 'Two Sum',
        description:
            'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nReturn the answer as two space-separated indices (0-indexed).',
        difficulty: 'easy',
        constraints:
            '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.',
        sampleInput: '4\n2 7 11 15\n9',
        sampleOutput: '0 1',
        testCases: [
            { input: '4\n2 7 11 15\n9', expectedOutput: '0 1' },
            { input: '3\n3 2 4\n6', expectedOutput: '1 2' },
            { input: '2\n3 3\n6', expectedOutput: '0 1' },
        ],
        tags: ['array', 'hash-table'],
        starterCode: {
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target;
    cin >> target;

    // Your code here

    return 0;
}`,
            python: `n = int(input())
nums = list(map(int, input().split()))
target = int(input())

# Your code here
`,
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();

        // Your code here

    }
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
    const n = parseInt(lines[0]);
    const nums = lines[1].split(' ').map(Number);
    const target = parseInt(lines[2]);

    // Your code here

});`,
        },
    },
    {
        title: 'FizzBuzz',
        description:
            'Given an integer `n`, print numbers from 1 to `n`. But for multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both 3 and 5 print "FizzBuzz".\n\nPrint each result on a new line.',
        difficulty: 'easy',
        constraints: '1 <= n <= 10^4',
        sampleInput: '5',
        sampleOutput: '1\n2\nFizz\n4\nBuzz',
        testCases: [
            { input: '5', expectedOutput: '1\n2\nFizz\n4\nBuzz' },
            {
                input: '15',
                expectedOutput:
                    '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
            },
            { input: '3', expectedOutput: '1\n2\nFizz' },
        ],
        tags: ['math', 'string'],
        starterCode: {
            cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // Your code here

    return 0;
}`,
            python: `n = int(input())

# Your code here
`,
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        // Your code here

    }
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
    const n = parseInt(line);

    // Your code here

});`,
        },
    },
    {
        title: 'Palindrome Check',
        description:
            'Given a string `s`, determine if it is a palindrome. A palindrome reads the same forward and backward.\n\nConsider only alphanumeric characters and ignore cases.\n\nPrint "true" if the string is a palindrome, otherwise print "false".',
        difficulty: 'easy',
        constraints:
            '1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.',
        sampleInput: 'A man, a plan, a canal: Panama',
        sampleOutput: 'true',
        testCases: [
            {
                input: 'A man, a plan, a canal: Panama',
                expectedOutput: 'true',
            },
            { input: 'race a car', expectedOutput: 'false' },
            { input: ' ', expectedOutput: 'true' },
        ],
        tags: ['string', 'two-pointers'],
        starterCode: {
            cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);

    // Your code here

    return 0;
}`,
            python: `s = input()

# Your code here
`,
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        // Your code here

    }
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {

    // Your code here

});`,
        },
    },
    {
        title: 'Reverse Linked List',
        description:
            'Given a space-separated list of integers representing a linked list, reverse the list and print the elements space-separated.\n\nIf the list is empty, print nothing.',
        difficulty: 'medium',
        constraints:
            'The number of nodes in the list is in the range [0, 5000].\n-5000 <= Node.val <= 5000',
        sampleInput: '1 2 3 4 5',
        sampleOutput: '5 4 3 2 1',
        testCases: [
            { input: '1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
            { input: '1 2', expectedOutput: '2 1' },
            { input: '1', expectedOutput: '1' },
        ],
        tags: ['linked-list', 'recursion'],
        starterCode: {
            cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    // Your code here

    return 0;
}`,
            python: `line = input()

# Your code here
`,
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();

        // Your code here

    }
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {

    // Your code here

});`,
        },
    },
    {
        title: 'Valid Parentheses',
        description:
            'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\nPrint "true" if valid, otherwise "false".',
        difficulty: 'medium',
        constraints: '1 <= s.length <= 10^4\ns consists of parentheses only.',
        sampleInput: '()',
        sampleOutput: 'true',
        testCases: [
            { input: '()', expectedOutput: 'true' },
            { input: '()[]{}', expectedOutput: 'true' },
            { input: '(]', expectedOutput: 'false' },
            { input: '([)]', expectedOutput: 'false' },
            { input: '{[]}', expectedOutput: 'true' },
        ],
        tags: ['stack', 'string'],
        starterCode: {
            cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;

    // Your code here

    return 0;
}`,
            python: `s = input()

# Your code here
`,
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        // Your code here

    }
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {

    // Your code here

});`,
        },
    },
];

const seedDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/leetcode-clone';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');

        await Problem.deleteMany({});
        console.log('Cleared existing problems');

        await Problem.insertMany(problems);
        console.log(`Seeded ${problems.length} problems successfully`);

        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error.message);
        process.exit(1);
    }
};

seedDB();

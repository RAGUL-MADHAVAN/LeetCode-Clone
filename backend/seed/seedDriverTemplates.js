const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const DriverTemplate = require('../models/DriverTemplate');

const templates = [

{
  name: "array-int",
  languages: {
    javascript: `
const fs=require("fs");
USER_CODE
const lines=fs.readFileSync(0,"utf-8").trim().split("\\n").map((l)=>l.trim()).filter((l)=>l!=="");

let idx=0;
const n=parseInt(lines[idx++] || "0");
const nums=n===0?[]:(lines[idx++] || "").trim().split(" ").filter((x)=>x!=="").map(Number);
const target=parseInt(lines[idx++] || "0");

const res=FUNC(nums,target);
console.log(Array.isArray(res)?res.join(" "):"");
`,

    python: `
import sys
USER_CODE
data=sys.stdin.read().splitlines()

nums=list(map(int,data[1].split()))
target=int(data[2])

res=FUNC(nums,target)
print(*res)
`,

    java: `import java.util.*;
USER_CODE

class Main{
 public static void main(String[] args){
  Scanner sc=new Scanner(System.in);
  int n=sc.nextInt();
  int[] nums=new int[n];
  for(int i=0;i<n;i++) nums[i]=sc.nextInt();
  int target=sc.nextInt();

  Solution s=new Solution();
  int[] res=s.FUNC(nums,target);
  System.out.println(res[0]+" "+res[1]);
 }
}
`,

    cpp: `
#include <stdio.h>
#include <stdlib.h>
#include <vector>
#include <algorithm>
using namespace std;
USER_CODE

int main(){
 int n; scanf("%d",&n);
 int nums[n];
 for(int i=0;i<n;i++) scanf("%d",&nums[i]);
 int target; scanf("%d",&target);

 int* res = FUNC(nums,n,target);
 printf("%d %d",res[0],res[1]);
 return 0;
}
`
  }
},

{
  name: "string",
  languages: {
    javascript: `
const fs=require("fs");
USER_CODE
const s=fs.readFileSync(0,"utf-8").trim();
console.log(FUNC(s));
`,

    python: `
import sys
USER_CODE
s=sys.stdin.read().strip()
print(FUNC(s))
`,

    java: `import java.util.*;

USER_CODE

class Main{
 public static void main(String[] args){
  Scanner sc=new Scanner(System.in);
  String s = sc.hasNextLine() ? sc.nextLine() : "";

  Solution sol=new Solution();
  System.out.println(sol.FUNC(s));
 }
}
`,

    cpp: `
#include <stdio.h>
#include <string.h>
#include <cstring>
#include <cstdlib>
#include <unordered_map>
#include <string>
using namespace std;

USER_CODE

int main(){
 char s[1000];
 scanf("%s",s);
 printf("%d",FUNC(s));
 return 0;
}
`
  }
},

{
  name: "linked-list",
  languages: {
    javascript: `
function ListNode(val,next=null){this.val=val;this.next=next;}

function build(arr){
 let dummy=new ListNode(0),curr=dummy;
 for(let x of arr){
  curr.next=new ListNode(x);
  curr=curr.next;
 }
 return dummy.next;
}

function printList(node){
 let res=[];
 while(node){
  res.push(node.val);
  node=node.next;
 }
 console.log(res.join(" "));
}

USER_CODE

const fs=require("fs");
const input=fs.readFileSync(0,"utf-8").trim().split("\\n");

const l1=build(input[1].split(" ").map(Number));
const l2=build(input[3].split(" ").map(Number));

printList(FUNC(l1,l2));
`,

    python: `
class ListNode:
 def __init__(self,val=0,next=None):
  self.val=val
  self.next=next

def build(arr):
 dummy=ListNode()
 cur=dummy
 for x in arr:
  cur.next=ListNode(x)
  cur=cur.next
 return dummy.next

def printList(node):
 res=[]
 while node:
  res.append(str(node.val))
  node=node.next
 print(" ".join(res))

USER_CODE

import sys
data=sys.stdin.read().splitlines()

l1=build(list(map(int,data[1].split())))
l2=build(list(map(int,data[3].split())))

printList(FUNC(l1,l2))
`,

    java: `
import java.util.*;

class ListNode {
 int val;
 ListNode next;
 ListNode(int x){ val = x; }
}

USER_CODE

class Main {

 static ListNode build(Scanner sc, int n){
  ListNode dummy = new ListNode(0), curr = dummy;
  for(int i = 0; i < n; i++){
   curr.next = new ListNode(sc.nextInt());
   curr = curr.next;
  }
  return dummy.next;
 }

 static void printList(ListNode node){
  while(node != null){
   System.out.print(node.val + " ");
   node = node.next;
  }
 }

 public static void main(String[] args){
  Scanner sc = new Scanner(System.in);

  int n = sc.nextInt();
  ListNode l1 = build(sc, n);

  int m = sc.nextInt();
  ListNode l2 = build(sc, m);

  Solution sol = new Solution();
  ListNode res = sol.FUNC(l1, l2);

  printList(res);
 }
}
`,

    cpp: `
#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

struct ListNode* createNode(int val){
    struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
    node->val = val;
    node->next = NULL;
    return node;
}

USER_CODE

struct ListNode* build(int n){
    struct ListNode *head=NULL,*curr=NULL;
    for(int i=0;i<n;i++){
        struct ListNode* node=createNode(0);
        scanf("%d",&node->val);

        if(!head){
            head=curr=node;
        } else {
            curr->next=node;
            curr=node;
        }
    }
    return head;
}

void printList(struct ListNode* node){
    while(node){
        printf("%d ",node->val);
        node=node->next;
    }
}

int main(){
    int n,m;

    scanf("%d",&n);
    struct ListNode* l1 = build(n);

    scanf("%d",&m);
    struct ListNode* l2 = build(m);

    struct ListNode* res = FUNC(l1,l2);
    printList(res);

    return 0;
}
`
    }
  },

  {
    name: "two-arrays",
    languages: {
      javascript: `
const fs=require("fs");
USER_CODE
const lines=fs.readFileSync(0,"utf-8").trim().split("\\n").map((l)=>l.trim()).filter((l)=>l!=="");

let idx=0;
const n=parseInt(lines[idx++] || "0");
const nums1=n===0?[]:(lines[idx++] || "").trim().split(" ").filter((x)=>x!=="").map(Number);
const m=parseInt(lines[idx++] || "0");
const nums2=m===0?[]:(lines[idx++] || "").trim().split(" ").filter((x)=>x!=="").map(Number);

const res=FUNC(nums1, nums2);
console.log(Number(res).toFixed(6));
`,

      python: `
import sys
USER_CODE
data=sys.stdin.read().splitlines()

nums1=list(map(int,data[1].split()))
nums2=list(map(int,data[3].split()))

print(f"{FUNC(nums1,nums2):.6f}")
`,

    java: `import java.util.*;
USER_CODE

class Main{
 public static void main(String[] args){
  Scanner sc=new Scanner(System.in);

  int n=sc.nextInt();
  int[] a=new int[n];
  for(int i=0;i<n;i++) a[i]=sc.nextInt();

  int m=sc.nextInt();
  int[] b=new int[m];
  for(int i=0;i<m;i++) b[i]=sc.nextInt();

  Solution s=new Solution();
  System.out.printf("%.6f", s.FUNC(a,b));
 }
}
`,

    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

USER_CODE

int main() {
    int n;
    if (!(cin >> n)) return 0;

    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int m;
    cin >> m;
    vector<int> b(m);
    for (int i = 0; i < m; i++) cin >> b[i];
    double res = FUNC(a, n, b, m); 
    cout << fixed << setprecision(6) << res;
    return 0;
}`
  }
},

{
  name: "inStringOpString",
  languages: {
    javascript: `
const fs=require("fs");
USER_CODE
const s=fs.readFileSync(0,"utf-8").trim();
console.log(FUNC(s));
`,

    python: `
import sys
USER_CODE
s=sys.stdin.read().strip()
print(FUNC(s))
`,

    java: `import java.util.*;

USER_CODE

class Main{
 public static void main(String[] args){
  Scanner sc=new Scanner(System.in);
  String s = sc.hasNextLine() ? sc.nextLine() : "";

  Solution sol=new Solution();
  System.out.println(sol.FUNC(s));
 }
}
`,

    cpp: `
#include <stdio.h>
#include <string.h>
#include <cstring>
#include <cstdlib>
#include <unordered_map>
#include <string>
using namespace std;

USER_CODE

int main(){
    char s[1000];
    fgets(s, 1000, stdin);
    s[strcspn(s, "\\n")] = 0;

    char* res = FUNC(s);
    printf("%s", res);
    return 0;
}
`
  }
}

];

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await DriverTemplate.deleteMany();
    console.log("Old templates removed");

    await DriverTemplate.insertMany(templates);
    console.log("Driver templates inserted");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedTemplates();
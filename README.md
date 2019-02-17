﻿# web-calc-of-loss-and-revenue

### Stack:
- mongoose
- express

### Description:
The application displays a list of administrators. Each administrator can be assigned any number of addresses. To each addresses can be assigned any number of jobs. Each job contains information about income, costs incurred and date of performance. The main purpose of the application is to display the sum of revenues and losses at each address.

##### db schema:
admin: {<br />
  _id: Objcetid,<br />
  name: String<br />
}<br />
street: {<br />
  _id: Objcetid,<br />
  name:<br />
  admin: Objcetid,<br />
 }<br />
job {<br />
  _id: Objcetid,<br />
  name: String,<br />
  street: Objcetid,<br />
  date: Date,<br />
  profit: Number,<br />
  loss: Number<br />
}<br />
  
### From me:
For now, the plan is to create a front end without using frameworks to get to know the basics well.

Of course I don't take knowledge from outer space, I created a basic back end based on [this series](https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q).

Yes I know that this could be done much easier way by using other languages and frameworks but I decided on such a stack, due to the fact that currently I'm learning web development technologies and an attempt to carry out this project using these tools is a great opportunity to learn :)

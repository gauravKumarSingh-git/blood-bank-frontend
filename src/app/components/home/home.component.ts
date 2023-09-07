import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    'https://mmhrc.in/file/wp-content/uploads/2022/03/blood-donation.jpg',
    'https://static.vecteezy.com/system/resources/previews/008/191/708/original/human-blood-donate-and-heart-rate-on-white-background-free-vector.jpg',
    'https://stanfordbloodcenter.org/wp-content/uploads/2020/06/Blood-facts_10-illustration-graphics__canteen.png',
  ]
}

import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = [
    'https://stanfordbloodcenter.org/wp-content/uploads/2020/06/Blood-facts_10-illustration-graphics__canteen.png',
    'https://www.nhlbi.nih.gov/sites/default/files/styles/16x9_crop/public/2023-05/Blood-Donation-Bag-Connected-to-Heart-Shape_Stock-Illustration.jpg?h=9fb2ff0c&itok=h-HPhN-6',
    'https://mmhrc.in/file/wp-content/uploads/2022/03/blood-donation.jpg'
  ]
}

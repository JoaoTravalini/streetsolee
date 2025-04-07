import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('carouselTrack1', { static: false }) carouselTrack1!: ElementRef<HTMLDivElement>;
  @ViewChild('carouselTrack2', { static: false }) carouselTrack2!: ElementRef<HTMLDivElement>;

  recommendedProducts = [
    { name: 'Tênis Adidas Rapidmove', image: 'assets/images/nigel1.jpg' },
    { name: 'Camiseta Adidas Running', image: 'assets/images/nigel2.jpg' },
    { name: 'Mochila Adidas Sport', image: 'assets/images/nigel3.jpg' },
    { name: 'Boné Adidas Original', image: 'assets/images/nigel1.jpg' },
    { name: 'Jaqueta Adidas Windbreaker', image: 'assets/images/nigel2.jpg' },
    { name: 'Mochila Adidas Sport', image: 'assets/images/nigel3.jpg' },
  ];

  personalizedProducts = [
    { name: 'Tênis Nike Air Max', image: 'assets/images/nigel1.jpg' },
    { name: 'Camiseta Nike Dry-Fit', image: 'assets/images/nigel1.jpg' },
    { name: 'Mochila Nike Gym', image: 'assets/images/nigel1.jpg' },
    { name: 'Boné Nike Original', image: 'assets/images/nigel1.jpg' },
    { name: 'Jaqueta Nike Sportswear', image: 'assets/images/nigel1.jpg' },
    { name: 'Camiseta Adidas Running', image: 'assets/images/nigel2.jpg' },
    { name: 'Camiseta Adidas Running', image: 'assets/images/nigel2.jpg' },
    { name: 'Camiseta Adidas Running', image: 'assets/images/nigel2.jpg' },
    { name: 'Camiseta Adidas Running', image: 'assets/images/nigel2.jpg' },
    { name: 'Camiseta Adidas Running', image: 'assets/images/nigel2.jpg' },
  ];

  scrollAmount = 300;

  ngAfterViewInit() {
    console.log(this.carouselTrack1, this.carouselTrack2);
  }

  nextSlide(carousel: 'carouselTrack1' | 'carouselTrack2') {
    if (this[carousel]) {
      this[carousel].nativeElement.scrollLeft += this.scrollAmount;
    }
  }

  prevSlide(carousel: 'carouselTrack1' | 'carouselTrack2') {
    if (this[carousel]) {
      this[carousel].nativeElement.scrollLeft -= this.scrollAmount;
    }
  }
}

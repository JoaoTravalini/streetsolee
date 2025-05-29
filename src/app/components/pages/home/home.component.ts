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
    {
      name: 'Air Jordan 1',
      price: 499,
      image: 'assets/images/airjordan1-3.jpg',
    },
    {
      name: 'ADIZERO ADIOS PRO 4 M',
      price: 1999,
      image: 'assets/images/nigel2.jpg',
    },
    {
      name: 'Nikedunk',
      price: 499,
      image: 'assets/images/nikedunk.jpg',
    },
    {
      name: 'Puma 180',
      price: 499,
      image: 'assets/images/puma180.jpg',
    },
    {
      name: 'Nikedunk',
      price: 499,
      image: 'assets/images/nikedunk.jpg',
    },
    {
      name: 'ADIZERO ADIOS PRO 4 M',
      price: 1999,
      image: 'assets/images/nigel2.jpg',
    },
    {
      name: 'Puma 180',
      price: 499,
      image: 'assets/images/puma180.jpg',
    },
    {
      name: 'Air Jordan 1',
      price: 499,
      image: 'assets/images/airjordan1-3.jpg',
    },
  ];

  personalizedProducts = this.recommendedProducts;

  scrollAmount = 300;

  ngAfterViewInit() { }

  nextSlide(carousel: 'carouselTrack1' | 'carouselTrack2') {
    const track = this[carousel]?.nativeElement;
    if (track) {
      const card = track.querySelector('.product-card') as HTMLElement;
      if (card) {
        const cardWidth = card.offsetWidth + 250; 
        track.scrollLeft += cardWidth;
      }
    }
  }

  prevSlide(carousel: 'carouselTrack1' | 'carouselTrack2') {
    const track = this[carousel]?.nativeElement;
    if (track) {
      const card = track.querySelector('.product-card') as HTMLElement;
      if (card) {
        const cardWidth = card.offsetWidth + 250;
        track.scrollLeft -= cardWidth;
      }
    }
  }
}

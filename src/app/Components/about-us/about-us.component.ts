import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;
  constructor(@Inject(DOCUMENT) private document : Document) { }


  ngOnInit(): void {
    let sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".body",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: "+=3500",
      }
    });
        
  }
}
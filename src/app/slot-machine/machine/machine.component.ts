import { Component, OnInit } from '@angular/core';

const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

@Component({
  selector: 'machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
  slots = [
    {},
    {},
    {},
    {},
    {},
  ];

  reels = new Array(SLOTS_PER_REEL);
  constructor() { }

  ngOnInit() {
    // initiate slots 
    /* for (let i = 0; i < 5; i++) {
      this.createSlots(document.querySelector('ring' + (i + 1)));
    } */


  }

  createSlots(ring) {

    const slotAngle = 360 / SLOTS_PER_REEL;
    const seed = this.getSeed();

    for (let i = 0; i < SLOTS_PER_REEL; i++) {
      const slot = document.createElement('div');

      slot.className = 'slot';
      // compute and assign the transform for this slot
      const transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
      slot.style.transform = transform;

      // setup the number to show inside the slots
      // the position is randomized to 
      //document.getElementsByClassName('slot').append('<p>' + ((seed + i) % 12) + '</p>');
      // add the poster to the row
      //ring.append(slot);
    }
  }

  getSlotTransform(i) {

    const slotAngle = 360 / SLOTS_PER_REEL;
    // const transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
    const transform = `rotateX(${(slotAngle * i)}deg) translateZ(${REEL_RADIUS}px)`;
    return transform;
  }

  getNum(i) {
    return ((this.getSeed() + i) % 12);
  }

  getSeed() {
    // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
    return Math.floor(Math.random() * (SLOTS_PER_REEL));
  }

  getRingId(i) {
    return 'ring' + (i + 1);
  }

  spin(timer) {

    //let txt = 'seeds: ';
    for (let i = 1; i < 6; i++) {
      let oldSeed = -1;
      /*
      checking that the old seed from the previous iteration is not the same as the current iteration;
      if this happens then the reel will not spin at all
      */
      //const oldClass = $('#ring' + i).attr('class');
      /* const oldClass = document.getElementsByClassName('#ring' + i)
      if (oldClass.length > 4) {
        oldSeed = parseInt(oldClass.slice(10));
        console.log(oldSeed);
      }
      let seed = this.getSeed();
      while (oldSeed === seed) {
        seed = this.getSeed();
      } */

      /* $('#ring' + i)
        .css('animation', 'back-spin 1s, spin-' + seed + ' ' + (timer + i * 0.5) + 's')
        .attr('class', 'ring spin-' + seed); */
    }

    console.log('=====');
  }

}

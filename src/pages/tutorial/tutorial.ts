import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Slides,IonicPage, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TutorialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  showSkip = true;
  
    @ViewChild('slides') slides: Slides;
    rootPage:string ="TabsPage";
    constructor(
      public navCtrl: NavController,
      public menu: MenuController,
      public storage: Storage,
      navParams: NavParams
    ) {
      this.rootPage = navParams.data.rootPage || "TabsPage";
     }
  
    startApp() {
      this.navCtrl.push(this.rootPage).then(() => {
        this.storage.set('hasSeenTutorial', 'true');
      })
    }
  
    onSlideChangeStart(slider: Slides) {
      this.showSkip = !slider.isEnd();
    }
  
    ionViewWillEnter() {
      this.slides.update();
    }
  
    ionViewDidEnter() {
      // the root left menu should be disabled on the tutorial page
      this.menu.enable(false);
    }
  
    ionViewDidLeave() {
      // enable the root left menu when leaving the tutorial page
      this.menu.enable(true);
    }
  

}

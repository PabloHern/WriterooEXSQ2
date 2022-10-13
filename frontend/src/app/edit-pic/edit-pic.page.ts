import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { StoryService } from '../services/story.service';
@Component({
  selector: 'app-edit-pic',
  templateUrl: './edit-pic.page.html',
  styleUrls: ['./edit-pic.page.scss'],
})
export class EditPicPage implements OnInit {
  capturedPhoto: string = "";
  id: any;
  story: any;
  constructor(private activatedRoute: ActivatedRoute, private storyService: StoryService, private photoService: PhotoService, private location: Location) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }

  ngOnInit() {
  }
  getStory(id: any) {
    console.log(this,)
    this.storyService.getStory(id).subscribe(response => {
      this.story = response;
    });
  }
  goBack(): void {
    this.location.back()
  }
  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }
  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  // async updatePic() {
  //   let blob = null;
  //   if (this.capturedPhoto != "") {
  //     const response = await fetch(this.capturedPhoto);
  //     blob = await response.blob();
  //   }
  //   this.getStory(this.id)
  //   console.log(this.story.title)
  //   this.storyService.updateStoryFull(this.id, this.story, blob)
  //     .subscribe((response) => {
  //       console.log("Photo sent");
  //       this.goBack();
  //     });
  // }
}

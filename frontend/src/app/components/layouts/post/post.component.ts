import { Component, OnInit } from '@angular/core';
import { OnSameUrlNavigation } from '@angular/router';

const TEXT_TRESHOLD = 512;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  text=`
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere eum, modi iste voluptates illum saepe doloribus iure laboriosam quis assumenda. Adipisci repellat sit quidem non repellendus dicta nesciunt totam, odit ex ratione! Tempore, tenetur, vitae veritatis a nihil excepturi architecto similique minima dolorum expedita maiores provident! Maiores neque aperiam, minima blanditiis dolor libero enim at eum! Alias exercitationem facere deleniti doloribus, dolore dignissimos optio unde voluptatem maxime nobis magni atque consequatur neque vero eligendi blanditiis dicta commodi! Eligendi autem voluptate veritatis modi dolor fugiat magnam? Maxime sed maiores suscipit perferendis odio architecto eius deserunt est repudiandae quia voluptates impedit, ab enim explicabo repellendus? Nesciunt veritatis necessitatibus facilis numquam omnis aperiam sit architecto. Dignissimos doloribus deserunt magni provident eligendi sit corporis amet animi velit praesentium. Animi sapiente nulla cum sint ut recusandae laudantium ex, eligendi, perferendis quibusdam inventore earum quia nemo! Reiciendis libero harum ad, ex ratione sit accusantium amet eum pariatur unde quibusdam, quos doloribus? Aperiam placeat eaque, ratione dolor deleniti sed explicabo incidunt harum corporis beatae non, porro possimus laborum quo suscipit distinctio iste aliquam cumque sapiente at! Possimus iste eaque dolorum numquam non, nobis velit eum voluptates doloribus sed eos repellat saepe autem dolor, odio distinctio, sunt eveniet modi voluptatum accusantium. Rem excepturi provident cum quae nobis corrupti dignissimos, asperiores, assumenda libero iste eius esse id ratione ullam harum officia deserunt rerum! Deserunt eos veritatis inventore quas voluptatibus repudiandae commodi molestias maiores quaerat fuga dolorem sit error omnis eius ex eveniet accusantium, incidunt sunt. Est beatae porro unde officiis deleniti omnis perferendis, non consequuntur incidunt reprehenderit doloribus. Porro optio illo, exercitationem beatae vitae velit magnam pariatur? Nesciunt aliquid voluptatum voluptas. Deleniti, rerum. Adipisci laudantium omnis ea illum vero consectetur minus assumenda velit molestias! Praesentium quam ad, magni esse optio voluptatibus in saepe cupiditate porro   `

  image = "../../../../assets/post_image.jpg"

  smallText?: string

  ngOnInit(): void {
    if(this.text.length > TEXT_TRESHOLD) {
      this.smallText = this.text.substring(0, TEXT_TRESHOLD);
    }
  }

  expand() {
    this.smallText = undefined;
  }
}

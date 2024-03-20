package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._ //do kowersji scala JSON i odwrotnie
import models.Product

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  private val productList = Seq(
    Product(Some(1), "Produkt 1", "Opis produktu 1", BigDecimal(99.99)),
    Product(Some(2), "Produkt 2", "Opis produktu 2", BigDecimal(199.99)),
  )

  def listProducts = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.products(productList))
  }

}


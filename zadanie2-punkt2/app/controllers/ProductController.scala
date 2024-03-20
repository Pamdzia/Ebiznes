package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json.{Json, OFormat}
import models.Product


@Singleton //z tej klasy bedzie tylko jedna instancja
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  //Lista produktow
  var productList: List[Product] = List(
    Product(1, "Produkt 1", "Opis produktu 1", 99.99),
    Product(2, "Produkt 2", "Opis produktu 2", 199.99),
    Product(3, "Produkt 3", "Opis produktu 3", 22.12)
  )

  //show all
  def listOfProducts = Action {
    Ok(views.html.products(productList))
  }

  //show by id(get)
  def getProduct(id: Long) = Action {
    productList.find(_.id == id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound
    }
  }

  //add (post)
  def addProduct = Action(parse.formUrlEncoded) { request =>
    val maybeProductData = for {
      nameSeq <- request.body.get("name")
      name <- nameSeq.headOption
      descriptionSeq <- request.body.get("description")
      description <- descriptionSeq.headOption
      priceSeq <- request.body.get("price")
      priceStr <- priceSeq.headOption
      price = BigDecimal(priceStr)
    } yield (name, description, price)

    maybeProductData match {
      case Some((name, description, price)) =>
        val newProduct = Product(0, name, description, price)
        productList :+= newProduct
        Redirect(routes.ProductController.listOfProducts)
      case None =>
        BadRequest("Invalid form data")
    }
  }


  //update(put)
  def updateProduct(id: Long) = Action(parse.formUrlEncoded) { request =>
    request.body match {
      case formData: Map[String, Seq[String]] =>

        val nameOption = formData.get("name").flatMap(_.headOption)
        val descriptionOption = formData.get("description").flatMap(_.headOption)
        val priceOption = formData.get("price").flatMap(_.headOption).flatMap { priceStr =>
          try {
            Some(BigDecimal(priceStr))
          } catch {
            case _: NumberFormatException => None
          }
        }


        (nameOption, descriptionOption, priceOption) match {
          case (Some(name), Some(description), Some(price)) =>
            productList = productList.map { product =>
              if (product.id == id) product.copy(name = name, description = description, price = price) else product
            }
            Redirect(routes.ProductController.listOfProducts)
          case _ =>
            BadRequest("Missing product data")
        }

      case _ =>
        BadRequest("Invalid form data")
    }
  }



  //delete(delete)
  def deleteProduct(id: Long) = Action { implicit request =>
    productList = productList.filterNot(_.id == id)
    Redirect(routes.ProductController.listOfProducts).withHeaders("Cache-Control" -> "no-cache, no-store, must-revalidate")
  }

  implicit val productFormat: OFormat[Product] = Json.format[Product]

  def addProductForm = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.addProductForm())
  }

  def updateProductForm(id: Long) = Action { implicit request: Request[AnyContent] =>
    productList.find(_.id == id).map { product =>
      Ok(views.html.updateProductForm(product))
    }.getOrElse(NotFound("Product not found"))
  }



}


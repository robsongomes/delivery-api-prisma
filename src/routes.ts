import { Router } from "express";
import requireAuthentication from "./middlewares/requireAuthentication";
import { DeliverItemController } from "./modules/deliveries/useCases/deliverItem/DeliverItemController";
import { OrderItemController } from "./modules/deliveries/useCases/orderItem/OrderItemController";
import { AutheticateUserController } from "./modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./modules/users/useCases/createUser/CreateUserController";

const routes = Router();

const createUserController = new CreateUserController();
const autheticateUserController = new AutheticateUserController();
const orderItemController = new OrderItemController();
const deliverItemController = new DeliverItemController();

routes.post("/users", createUserController.handle);
routes.post("/signin", autheticateUserController.handle);
routes.post("/orders", requireAuthentication, orderItemController.handle);
routes.post(
  "/orders/deliver",
  requireAuthentication,
  deliverItemController.handle
);

export { routes };

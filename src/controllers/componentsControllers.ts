import { Request, Response, NextFunction } from "express";
import Component, { kind } from "../models/Components/Component";
import Inversor from "../models/Components/Inversor";
import Mounting_System from "../models/Components/Mounting_System";
import Solar_Panel from "../models/Components/Solar_Panel";
import ErrorClass from "../Error/errorClass";
import Branch from "../models/Components/branch";

export const getAllComponents = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inversor = Component.getComponents(kind.INVERSOR);
    const solar_panel = Component.getComponents(kind.SOLAR_PANEL);
    const mounting_system = Component.getComponents(kind.MOUNTING_SYSTEM);
    const constant = Component.getComponents(kind.CONSTANT);
    const component_constant = Component.getComponents(kind.COMPONENT_CONSTANT);
    const branches = Component.getComponents(kind.BRANCH);
    Promise.all([
      inversor,
      solar_panel,
      mounting_system,
      constant,
      component_constant,
      branches,
    ]).then((arr) => {
      const components = {
        inversor: arr[0],
        solar_panel: arr[1],
        mounting_system: arr[2],
        constant: arr[3],
        component_constant: arr[4],
        branch: arr[5],
      };
      res.status(200).json(components);
    });
  } catch (e) {
    const error = new ErrorClass(e.statusCode || 500, e.message, e.payload);
    return next(error);
  }
};

export const addComponent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { component_kind, component } = req.body;

  let newComponent;
  switch (component_kind) {
    case kind.INVERSOR:
      newComponent = new Inversor(
        component.description,
        +component.cost,
        +component.capacity_kw
      );
      break;
    case kind.MOUNTING_SYSTEM:
      newComponent = new Mounting_System(
        component.description,
        +component.cost
      );
      break;
    case kind.SOLAR_PANEL:
      newComponent = new Solar_Panel(
        component.description,
        +component.cost,
        +component.watts,
        +component.dimension
      );
      break;
    case kind.BRANCH:
      newComponent = new Branch(component.branch);
      break;
  }
  try {
    if (!newComponent) throw new ErrorClass(501, "COMPONENT KIND NOT FOUND");
    const id = await newComponent.save();
    if (!id) throw new ErrorClass(501, "CANNOT CREATE COMPONENT");
    res.status(201).json({ id });
  } catch (e) {
    const error = new ErrorClass(e.statusCode || 500, e.message);
    next(error);
  }
};

export const deleteComponent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { component_kind, id } = req.params;

  try {
    const success = await Component.deleteComponent(component_kind, id);
    if (!success) throw new ErrorClass(304, "CANNOT DELETE COMPONENT");
    res.status(200).json({ success: true });
  } catch (e) {
    const error = new ErrorClass(e.statusCode || 500, e.message);
    next(error);
  }
};

export const updateComponent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { component_kind, component } = req.body;
  try {
    const success = await Component.updateComponent(component_kind, component);
    if (!success) throw new ErrorClass(304, "CANNOT UPDATE COMPONENT");
    res.status(200).json({ success });
  } catch (e) {
    const error = new ErrorClass(e.statusCode || 500, e.message);
    next(error);
  }
};

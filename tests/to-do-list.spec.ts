import { expect, test } from '@playwright/test';

// Definir los casos de prueba para las tareas
const TODOS = [
  "", // Caso donde el título está vacío
  "Una tarea con un texto muy largooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", // Caso con título demasiado largo
  "Una tarea correcta." // Caso válido
];

// Configuración previa a cada prueba (login)
test.beforeEach("Login in the page", async ({ page }) => {
  // Configuración de tiempo de espera para la página
  page.setDefaultTimeout(0);
  
  // Acceder a la página de la aplicación
  await page.goto("https://pushing-it.vercel.app/");
  
  // Realizar el login
  await page.getByText('Iniciá sesión').click({ clickCount: 2 });
  await page.getByRole('textbox', { name: 'User' }).fill("MartinTest");
  await page.getByRole('textbox', { name: 'Password' }).fill('123456@');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  // Acceder a la lista de tareas
  await page.getByRole('paragraph').filter({ hasText: 'To Do List' }).click();
});

// Descripción del grupo de pruebas
test.describe("Test use cases for To Do List", () => {

  // Caso de prueba: Verificar que una tarea se agrega correctamente
  test("Should successfully add a new ToDo item to the list", async ({ page }) => {
    // Limpiar todas las tareas antes de agregar una nueva
    await page.getByRole('button', { name: 'Remove all' }).click();
    
    // Agregar una nueva tarea válida
    const taskInput = await page.locator('#task');
    await taskInput.fill(TODOS[2]); // Usar el valor válido de la lista
    await page.getByRole('button', { name: 'Send' }).click();

    // Esperar a que el nuevo ítem se agregue en la lista
    await page.waitForSelector('ul[role="list"] li');

    // Contar cuántos elementos hay en la lista
    const itemsCount = await page.locator('ul[role="list"] li').count();
    console.log(`Cantidad de elementos en la lista: ${itemsCount}`);
    
    // Asegurar que la lista tiene al menos un elemento
    expect(itemsCount).toBeGreaterThan(0);
  });

  // Caso de prueba: Verificar que no se guarda una tarea vacía
  test("(This test is expected to fail) Should verify that a task is not saved if the input is empty", async ({ page }) => {
    // Limpiar las tareas antes de agregar una nueva
    await page.getByRole('button', { name: 'Remove all' }).click();
    
    // Intentar agregar una tarea vacía
    const taskInput = await page.locator('#task');
    await taskInput.fill(TODOS[0]); // Usar el valor vacío
    await page.getByRole('button', { name: 'Send' }).click();

    // Esperar a que el ítem se agregue (aunque no debería)
    await page.waitForSelector('ul[role="list"] li');

    // Contar cuántos elementos hay en la lista
    const itemsCount = await page.locator('ul[role="list"] li').count();
    console.log(`Cantidad de elementos en la lista: ${itemsCount}`);
    
    // Asegurar que la lista está vacía
    expect(itemsCount).toEqual(0);
  });

  // Caso de prueba: Verificar que no se guarda una tarea con un título demasiado largo
  test("(This test is expected to fail) Should verify that a task with a title too long is not saved", async ({ page }) => {
    // Limpiar las tareas antes de agregar una nueva
    await page.getByRole('button', { name: 'Remove all' }).click();
    
    // Intentar agregar una tarea con un título demasiado largo
    const taskInput = await page.locator('#task');
    await taskInput.fill(TODOS[1]); // Usar el valor con el título largo
    await page.getByRole('button', { name: 'Send' }).click();

    // Esperar a que el ítem se agregue (aunque no debería)
    await page.waitForSelector('ul[role="list"] li');

    // Contar cuántos elementos hay en la lista
    const itemsCount = await page.locator('ul[role="list"] li').count();
    console.log(`Cantidad de elementos en la lista: ${itemsCount}`);
    
    // Asegurar que la lista está vacía (el título largo no debería guardarse)
    expect(itemsCount).toEqual(0);
  });

});

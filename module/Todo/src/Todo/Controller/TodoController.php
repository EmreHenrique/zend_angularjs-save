<?php

namespace Todo\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\Json\Json;
use Todo\Model\Todo;

class TodoController extends AbstractActionController {

    protected $todoTable;

    public function indexAction() {
        
    }

    public function listAction() {
        try {
            $result = $this->getTodoTable()->fetchAll();
            $data = array();
            foreach ($result as $row) {
                array_push($data, $row);
            }
            echo Json::encode($data);
            exit();
        } catch (\Exception $e) {
            echo "Récupère exception: " . get_class($e) . "\n" + "Message: " . $e->getMessage() . "\n";
            exit();
        }
    }

    public function addAction() {
        try {
            $request = $this->getRequest();

            if ($request->isPost()) {
                $data = $request->getContent();
                $data_dec = Json::decode($data);
                $todo = new Todo();
                $todo->exchangeArray(get_object_vars($data_dec));
                $this->getTodoTable()->saveTodo($todo);
            }
        } catch (\Exception $e) {
            echo "Récupère exception: " . get_class($e) . "\n" + "Message: " . $e->getMessage() . "\n";
            exit();
        }
    }

    public function editAction() {
                try {
            $request = $this->getRequest();

            if ($request->isPost()) {
                $data = $request->getContent();
                $data_dec = Json::decode($data);
                $devis = new Devis();
                $devis->exchangeArray(get_object_vars($data_dec));
                $this->getTodoTable()->saveTodo($devis);
            }
        } catch (\Exception $e) {
            echo "Récupère exception: " . get_class($e) . "\n" + "Message: " . $e->getMessage() . "\n";
            exit();
        }
    }

    //public function deleteAction($id) {
    public function deleteAction() {
          //$this->tableGateway->delete(array('id' => (int) $id));
        $id = (int) $this->params()->fromRoute("id", 0);
        $this->getTodoTable()->deleteTodo($id);
    }
    
        public function getTodoTable() {
        if (!$this->todoTable) {
            $sm = $this->getServiceLocator();
            $this->todoTable = $sm->get('Todo\Model\TodoTable');
        }
        return $this->todoTable;
    }

}

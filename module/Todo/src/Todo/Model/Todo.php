<?php

namespace Todo\Model;

/**
 * Description of Todo
 *
 * @author achraf
 */
class Todo {

    public $id;
    public $tache;
    public $date_tache;

    public function exchangeArray($data) {

        $this->id = (!empty($data['id'])) ? $data['id'] : 0;
        $this->tache = (!empty($data['tache'])) ? $data['tache'] : null;
        if (!is_string($data['data_tache'])) {
            $this->date_tache = (!empty($data['data_tache'])) ? new DateTime($data['data_tache']) : null;
        } else {
            $this->date_tache = (!empty($data['data_tache'])) ? $data['data_tache'] : null;
        }
    }

}

<?php

namespace Heiner\Heiner\Controller;

/***
 *
 * This file is part of the "personenundfirmen" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 *  (c) 2021 Heiner Giehl <heiner.giehl@tu-dortmund.de>, HeinerGiehl
 *
 ***/
/**
 * PersonController.
 */
class AjaxPersonController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
{
    /**
     * personRepository.
     *
     * @var \Heiner\Heiner\Domain\Repository\PersonRepository
     */
    protected $personRepository = null;

    /**
     * companyRepository.
     *
     * @var \Heiner\Heiner\Domain\Repository\CompanyRepository
     */
    protected $companyRepository = null;

    protected $defaultViewObjectName = \TYPO3\CMS\Extbase\Mvc\View\JsonView::class;

    public function injectPersonRepository(
        \Heiner\Heiner\Domain\Repository\PersonRepository $personRepository
    ) {
        $this->personRepository = $personRepository;
    }

    public function injectCompanyRepository(
        \Heiner\Heiner\Domain\Repository\CompanyRepository $companyRepository
    ) {
        $this->companyRepository = $companyRepository;
    }

    public function ajaxListAction()
    {
        if (
            !empty(\TYPO3\CMS\Core\Utility\GeneralUtility::_GP('ajaxPageLimit'))
        ) {
            $ajaxPageLimit = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP(
                'ajaxPageLimit'
            );
        }
        if (!empty(\TYPO3\CMS\Core\Utility\GeneralUtility::_GP('pageNumber'))) {
            $currentPage = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP(
                'pageNumber'
            );
        }

        $currentPage = (int) $currentPage;

        $ajaxPageLimit = (int) $ajaxPageLimit;
        $data = [];
        $data = $this->personRepository->pagination(
            $currentPage,
            $ajaxPageLimit
        );

        $data['pageLimit'] = [1, 2, 4, 6, 8, 10];
        $data['currentPage'] = $currentPage;
        $data['nextPage'] = $currentPage + 1;
        $data['previousPage'] = $currentPage - 1;

        $loggedInUser = $GLOBALS['TSFE']->fe_user->user;
        $data['currentLimit'] = $ajaxPageLimit;
        $data['loggedInUser'] = $loggedInUser;
        $data['defaultLimit'] = $this->settings['limitForPersons'];

        $this->view->setVariablesToRender(['data']);

        $this->view->assign('data', $data);
    }

    public function ajaxSearchAction()
    {
        $query = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP('query');

        $personProperty = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP(
            'personProperty'
        );

        $limit = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP('limit');

        $currentPage = \TYPO3\CMS\Core\Utility\GeneralUtility::_GP(
            'currentPage'
        );
        $data = [];

        $data = $this->personRepository->ajaxSearch(
            $query,
            $personProperty,
            $currentPage,
            $limit
        );
        $data['currentPage'] = $currentPage;
        $data['nextPage'] = $currentPage + 1;
        $data['previousPage'] = $currentPage - 1;

        $loggedInUser = $GLOBALS['TSFE']->fe_user->user;

        $data['loggedInUser'] = $loggedInUser;
        $data['defaultLimit'] = $ajaxPageLimit;
        $loggedInUser = $GLOBALS['TSFE']->fe_user->user;

        $data['loggedInUser'] = $loggedInUser;
        $data['defaultLimit'] = $this->settings['limitForPersons'];
        $data['currentLimit'] = $ajaxPageLimit;
        $this->view->setVariablesToRender(['data']);
        $this->view->assign('data', $data);
    }

    public function ajaxUpdateAction()
    {
        $uid= $this->request->getArgument('uid');
        
        $personToUpdate=$this->personRepository->findByUid($uid);
        $personToUpdate->setAnrede($this->request->getArgument('anrede'));
        $personToUpdate->setVorname($this->request->getArgument('vorname'));
        $personToUpdate->setNachname($this->request->getArgument('nachname'));
        $personToUpdate->setEmail($this->request->getArgument('email'));
        $personToUpdate->setTelefon($this->request->getArgument('telefon'));
        $personToUpdate->setHandy($this->request->getArgument('handy'));

        $personsFirma= $this->companyRepository->findByUid($this->request->getArgument('firma'));
        $personToUpdate->setFirma($personsFirma);
        
        $this->personRepository->update($personToUpdate);
        
        $this->view->setVariablesToRender(['data']);
        $this->view->assign('data', $data);
    }
     
      
    

    public function getAllCompaniesAction()
    {
        $companies = $this->companyRepository->findAll();
        $this->view->setVariablesToRender(['companies']);
        $this->view->assign('companies', $companies);
    }
}
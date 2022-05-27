from flask import Blueprint, jsonify, request
from orm_interface.base import Session
from orm_interface.entities.e3_entity.e3_courses import e3_courses




e3_selector = Blueprint("e3_selector", _name_)

session = Session()

 # route for all courses  
@e3_selector.route('/e3course', methods=['GET'])
def gete3course():
        #get all courses from database
 docs = session.query(e3_courses).all()
 response= []
 for e3_course in docs:
        response.append({
            "selected": e3_course.selected,
            "Title": e3_course.title,
            "Link": e3_course.link,
            "catalog" : e3_course.catalog,
            "Type" : e3_course.type,
            "SWS" :e3_course.sws,
            "Erwartete Teilnehmer" : e3_course.num_expected_participants,
            "Max. Teilnehmer" : e3_course.max_participants,
            "Credits" : e3_course.credit,
            "Language" : e3_course.language,
            "Description" :e3_course.description,
            "Times_manual" :e3_course.location ,
            "Location" : e3_course.exam_type,
            "Exam" : e3_course.time_manual,
            "Ausgeschlossen_Ingenieurwissenschaften_Bachelor" : e3_course.ausgeschlossen_ingenieurwissenschaften_bachelor,
             "fairness" : e3_course.fairness,
             "support": e3_course.support,
             "material": e3_course.material,
             "fun": e3_course.fun,
             "comprehensibility": e3_course.comprehensibility,
             "interesting": e3_course.interesting,
             "grade_effort": e3_course.grade_effort
        })
 return jsonify(response)